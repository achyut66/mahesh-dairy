<?php

namespace EssentialBlocks\Admin;

/**
 * OpenAI API Integration for Essential Blocks
 *
 * This class handles the integration with OpenAI API for content generation
 */
class OpenAI
{
    /**
     * API Key for OpenAI
     *
     * @var string
     */
    private $api_key;

    /**
     * Maximum number of tokens to generate
     *
     * @var int
     */
    private $max_tokens = 1500;

    /**
     * API Endpoint for OpenAI Chat Completions
     *
     * @var string
     */
    private $api_endpoint = 'https://api.openai.com/v1/chat/completions';

    /**
     * API Endpoint for OpenAI Image Generation (DALL-E)
     *
     * @var string
     */
    private $image_api_endpoint = 'https://api.openai.com/v1/images/generations';

    /**
     * Model to use for OpenAI text generation
     * //TODO: Add support for other models
     *
     * @var string
     */
    private $model = 'gpt-4o-mini';

    /**
     * Model to use for OpenAI image generation
     *
     * @var string
     */
    private $image_model = 'dall-e-3';

    /**
     * Default image size for DALL-E
     *
     * @var string
     */
    private $image_size = '1024x1024';

    /**
     * Default image quality for DALL-E
     *
     * @var string
     */
    private $image_quality = 'standard';

    /**
     * Constructor
     */
    public function __construct()
    {
        // Get API key from options
        $eb_write_with_ai = (array) get_option( 'eb_write_with_ai', [  ] );
        if ( ! empty( $eb_write_with_ai[ 'apiKey' ] ) ) {
            $this->set_api_key( $eb_write_with_ai[ 'apiKey' ] );
        }

        if ( isset( $eb_write_with_ai[ 'maxTokens' ] ) && intval( $eb_write_with_ai[ 'maxTokens' ] ) > 0 ) {
            $this->max_tokens = intval( $eb_write_with_ai[ 'maxTokens' ] );
        }
    }

    /**
     * Set API Key
     *
     * @param string $api_key
     * @return void
     */
    public function set_api_key( $api_key )
    {
        $this->api_key = $api_key;
    }

    /**
     * Set Max Tokens
     *
     * @param int $max_tokens
     * @return void
     */
    public function set_max_tokens( $max_tokens )
    {
        $this->max_tokens = intval( $max_tokens );
    }

    /**
     * Validate API Key
     *
     * Makes a simple request to the OpenAI API to validate the API key
     *
     * @param string $api_key The API key to validate
     * @return array Response with status and message
     */
    public function validate_api_key( $api_key )
    {
        if ( empty( $api_key ) ) {
            return [
                'success' => false,
                'message' => __( 'API key is required.', 'essential-blocks' )
             ];
        }

        // Make a simple request to the OpenAI API to validate the key
        $response = wp_remote_post(
            'https://api.openai.com/v1/chat/completions',
            [
                'headers' => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $api_key
                 ],
                'body'    => wp_json_encode( [
                    'model'      => $this->model,
                    'messages'   => [
                        [
                            'role'    => 'user',
                            'content' => 'Hello'
                         ]
                     ],
                    'max_tokens' => 5
                 ] ),
                'timeout' => 15
             ]
        );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        // Check if the response is valid
        if ( $response_code !== 200 ) {
            $error_message = isset( $response_body[ 'error' ][ 'message' ] )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Invalid API key or API error.', 'essential-blocks' );

            return [
                'success' => false,
                'message' => $error_message
             ];
        }

        return [
            'success' => true,
            'message' => __( 'API key is valid.', 'essential-blocks' )
         ];
    }

    /**
     * Generate content using OpenAI API
     *
     * @param string $prompt The complete prompt for content generation
     * @return array Response with status and content
     */
    public function generate_content( $prompt, $writePageContent = 'writePageContent' )
    {
        // Get AI settings
        $eb_write_with_ai = (array) get_option( 'eb_write_with_ai', [  ] );

        // Check if AI is enabled
        $is_ai_enabled_for_page_content = isset( $eb_write_with_ai[ 'writePageContent' ] ) ? $eb_write_with_ai[ 'writePageContent' ] : true;
        $is_ai_enabled_for_richtext     = isset( $eb_write_with_ai[ 'writeRichtext' ] ) ? $eb_write_with_ai[ 'writeRichtext' ] : true;
        $is_ai_enabled_for_input_fields = isset( $eb_write_with_ai[ 'writeInputFields' ] ) ? $eb_write_with_ai[ 'writeInputFields' ] : true;
        if ( $writePageContent === 'writePageContent' && ! $is_ai_enabled_for_page_content ) {
            return [
                'success' => false,
                'message' => __( 'AI page content generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        } elseif ( $writePageContent === 'writeRichtext' && ! $is_ai_enabled_for_richtext ) {
            return [
                'success' => false,
                'message' => __( 'AI richtext content generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        } elseif ( $writePageContent === 'writeInputFields' && ! $is_ai_enabled_for_input_fields ) {
            return [
                'success' => false,
                'message' => __( 'AI input fieldcontent generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        }

        // Check if API key is set
        if ( empty( $this->api_key ) ) {
            return [
                'success' => false,
                'message' => __( 'OpenAI API key is not set. Please set it in the settings.', 'essential-blocks' )
             ];
        }

        // Prepare the request body
        $body = [
            'model'       => $this->model,
            'messages'    => [
                [
                    'role'    => 'user',
                    'content' => $prompt
                 ]
             ],
            'temperature' => 0.7,
            'max_tokens'  => $this->max_tokens
         ];

        // Make the API request
        $response = wp_remote_post(
            $this->api_endpoint,
            [
                'headers'     => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->api_key
                 ],
                'body'        => wp_json_encode( $body ),
                'timeout'     => 60,
                'data_format' => 'body'
             ]
        );

        // error_log( print_r( $response, true ) );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        // Check if the response is valid
        if ( $response_code !== 200 || ! isset( $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ] ) ) {
            $error_message = isset( $response_body[ 'error' ][ 'message' ] )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Unknown error occurred while generating content.', 'essential-blocks' );

            return [
                'success'  => false,
                'message'  => $error_message,
                'response' => $response_body
             ];
        }

        // Return the generated content
        return [
            'success' => true,
            'content' => $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ],
            'usage'   => isset( $response_body[ 'usage' ] ) ? $response_body[ 'usage' ] : null
         ];
    }

    /**
     * Convert string compression values to numeric values
     *
     * @param string $compression The compression level (high, medium, low, or numeric value)
     * @return int The numeric compression value
     */
    private function convert_compression_to_numeric( $compression )
    {
        // If it's already numeric, return as integer
        if ( is_numeric( $compression ) ) {
            return intval( $compression );
        }

        // Convert string values to numeric
        switch ( strtolower( trim( $compression ) ) ) {
            case 'high':
                return 100;
            case 'medium':
                return 75;
            case 'low':
                return 50;
            case 'standard':
            default:
                return 100; // Default to high quality
        }
    }

    /**
     * Generate image using OpenAI DALL-E API
     *
     * @param string $prompt The prompt for image generation
     * @param string $model The model to use (dall-e-2, dall-e-3)
     * @param string $size Image size (varies by model)
     * @param string $quality Image quality (standard, hd)
     * @param string $style Image style (vivid, natural) - DALL-E 3 only
     * @param string $writePageContent Context for AI settings check
     * @param string $background Background handling option
     * @param string $output_format Image output format (png, jpeg, webp)
     * @param string $output_compression Compression level for the output
     * @return array Response with status and image URL/base64
     */
    public function generate_image( $prompt, $model = 'gpt-image-1', $size = '1024x1024', $quality = 'standard', $style = 'vivid', $writePageContent = 'writePageContent', $background = '', $output_format = 'png', $output_compression = 'standard', $image_count = 2 )
    {
        // Get AI settings
        $eb_write_with_ai = (array) get_option( 'eb_write_with_ai', [  ] );

        // Check if AI is enabled for image generation
        $is_ai_enabled_for_image = isset( $eb_write_with_ai[ 'generateImage' ] ) ? $eb_write_with_ai[ 'generateImage' ] : true;

        if ( ! $is_ai_enabled_for_image ) {
            return [
                'success' => false,
                'message' => __( 'AI Image generation is disabled. Please enable it in the settings.', 'essential-blocks' )
             ];
        }

        // Check if API key is set
        if ( empty( $this->api_key ) ) {
            return [
                'success' => false,
                'message' => __( 'OpenAI API key is not set. Please set it in the settings.', 'essential-blocks' )
             ];
        }

        // Validate prompt
        if ( empty( $prompt ) || ! is_string( $prompt ) ) {
            return [
                'success' => false,
                'message' => __( 'Image prompt is required and must be a valid string.', 'essential-blocks' )
             ];
        }

        // Validate and sanitize prompt length (DALL-E has a 1000 character limit)
        if ( strlen( $prompt ) > 1000 ) {
            return [
                'success' => false,
                'message' => __( 'Image prompt must be 1000 characters or less.', 'essential-blocks' )
             ];
        }

        // Implement intelligent model selection based on parameters
        // $model = $this->determine_optimal_model( $model, $size, $quality, $style, $background, $output_format, $output_compression );

        // Validate model
        $valid_models = [ 'dall-e-2', 'dall-e-3', 'gpt-image-1' ];
        if ( ! in_array( $model, $valid_models ) ) {
            $model = $this->image_model; // fallback to default
        }

        // Validate image size based on model
        if ( $model === 'dall-e-2' ) {
            $valid_sizes = [ '256x256', '512x512', '1024x1024' ];
        } else { // dall-e-3
            $valid_sizes = [ '1024x1024', '1792x1024', '1024x1792' ];
        }

        if ( ! in_array( $size, $valid_sizes ) ) {
            $size = $model === 'dall-e-2' ? '1024x1024' : '1024x1024'; // fallback to default
        }

        // Filter and validate parameters based on selected model
        $filtered_params = $this->filter_parameters_by_model( $model, $size, $quality, $style, $background, $output_format, $output_compression );

        // Extract filtered parameters
        $size               = $filtered_params[ 'size' ];
        $quality            = $filtered_params[ 'quality' ];
        $style              = $filtered_params[ 'style' ];
        $background         = $filtered_params[ 'background' ];
        $output_format      = $filtered_params[ 'output_format' ];
        $output_compression = $filtered_params[ 'output_compression' ];

        // Convert output_compression from string to numeric if needed
        $output_compression = $this->convert_compression_to_numeric( $output_compression );

        // Validate and set image count based on model capabilities
        $validated_image_count = $image_count;
        if ( $model === 'dall-e-3' && $image_count > 1 ) {
            $validated_image_count = 1; // DALL-E 3 only supports 1 image per request
        } elseif ( $image_count < 1 || $image_count > 10 ) {
            $validated_image_count = 2; // Default fallback
        }

        // Prepare the request body with filtered parameters
        $body = [
            'model'           => $model,
            'prompt'          => $prompt,
            'n'               => $validated_image_count, // number of images to generate
            'size'            => $size,
            'response_format' => 'b64_json' // url or b64_json
         ];

        // Add model-specific parameters based on capabilities
        switch ( $model ) {
            case 'dall-e-2':
                // DALL-E 2 only supports basic parameters
                break;

            case 'dall-e-3':
                // DALL-E 3 supports quality and style
                if ( ! empty( $quality ) && $quality !== 'standard' ) {
                    $body[ 'quality' ] = $quality;
                }
                if ( ! empty( $style ) && $style !== 'none' ) {
                    $body[ 'style' ] = $style;
                }
                // Note: 'n' is already set above with validated count (always 1 for dall-e-3)
                break;

            case 'gpt-image-1':
                // GPT-Image-1 supports additional parameters
                if ( ! empty( $background ) && $background !== 'auto' ) {
                    $body[ 'background' ] = $background;
                }
                if ( ! empty( $output_format ) && $output_format !== 'png' ) {
                    $body[ 'output_format' ] = $output_format;
                }
                if ( ! empty( $output_compression ) ) {
                    $body[ 'output_compression' ] = $output_compression;
                }
                if ( ! empty( $quality ) && $quality !== 'medium' ) {
                    $body[ 'quality' ] = $quality;
                }
                unset( $body[ 'response_format' ] );
                break;
        }
        error_log( 'GPT Model: ' . $model );
        error_log( 'GPT Body: ' . print_r( $body, true ) );

        // return;
        // wp_die();

        // Make the API request
        $response = wp_remote_post(
            $this->image_api_endpoint,
            [
                'headers'     => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->api_key
                 ],
                'body'        => wp_json_encode( $body ),
                'timeout'     => 180,
                'data_format' => 'body'
             ]
        );

        error_log( 'Response-----' . print_r( $response, true ) );

        // Check for errors
        if ( is_wp_error( $response ) ) {
            return [
                'success' => false,
                'message' => $response->get_error_message()
             ];
        }

        // Parse the response
        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        // Check if the response is valid - handle both 'url' and 'b64_json' formats
        if ( $response_code !== 200 || ! isset( $response_body[ 'data' ][ 0 ] ) ) {
            $error_message = isset( $response_body[ 'error' ][ 'message' ] )
            ? $response_body[ 'error' ][ 'message' ]
            : __( 'Unknown error occurred while generating image.', 'essential-blocks' );

            return [
                'success'  => false,
                'message'  => $error_message,
                'response' => $response_body
             ];
        }

        // Check if first image has either url or b64_json
        $first_image = $response_body[ 'data' ][ 0 ];
        if ( ! isset( $first_image[ 'url' ] ) && ! isset( $first_image[ 'b64_json' ] ) ) {
            return [
                'success'  => false,
                'message'  => __( 'Invalid image data received from OpenAI API.', 'essential-blocks' ),
                'response' => $response_body
             ];
        }

        // Process all generated images
        $images = [  ];
        foreach ( $response_body[ 'data' ] as $index => $image_data ) {
            // Handle both URL and base64 formats
            $image_url = null;
            $image_b64 = null;

            if ( isset( $image_data[ 'url' ] ) ) {
                $image_url = $image_data[ 'url' ];
            } elseif ( isset( $image_data[ 'b64_json' ] ) ) {
                $image_b64 = $image_data[ 'b64_json' ];
            }

            $revised_prompt = isset( $image_data[ 'revised_prompt' ] ) ? $image_data[ 'revised_prompt' ] : $prompt;

            // Generate metadata for each image
            $metadata = $this->generate_image_metadata( $revised_prompt, $prompt );

            $images[  ] = [
                'image_url'      => $image_url,
                'image_b64'      => $image_b64,
                'revised_prompt' => $revised_prompt,
                'title'          => $metadata[ 'title' ],
                'alt_tag'        => $metadata[ 'alt_tag' ],
                'caption'        => $metadata[ 'caption' ],
                'description'    => $metadata[ 'description' ]
             ];
        }

        // Extract usage information from the API response
        $usage_info = $this->extract_image_usage_info( $response_body, $model, $validated_image_count );
        error_log( 'Usage Info: ' . print_r( $usage_info, true ) );

        // Return all generated images with usage information
        return [
            'success' => true,
            'images'  => $images,
            'usage'   => $usage_info
         ];
    }

    /**
     * Extract usage information from OpenAI image generation API response
     *
     * @param array $response_body The API response body
     * @param string $model The model used for generation
     * @param int $image_count The number of images generated
     * @return array Usage information with formatted message
     */
    private function extract_image_usage_info( $response_body, $model, $image_count )
    {
        // Check if usage information is available in the response
        if ( isset( $response_body[ 'usage' ] ) ) {
            $usage = $response_body[ 'usage' ];

            // Extract token information
            $input_tokens  = isset( $usage[ 'input_tokens' ] ) ? intval( $usage[ 'input_tokens' ] ) : 0;
            $output_tokens = isset( $usage[ 'output_tokens' ] ) ? intval( $usage[ 'output_tokens' ] ) : 0;
            $total_tokens  = isset( $usage[ 'total_tokens' ] ) ? intval( $usage[ 'total_tokens' ] ) : ( $input_tokens + $output_tokens );

            // Create user-friendly usage message
            $usage_message = sprintf(
                __( 'Using %s model, you consumed %d input tokens and %d output tokens for generating %d image(s).', 'essential-blocks' ),
                strtoupper( $model ),
                $input_tokens,
                $output_tokens,
                $image_count
            );

            return [
                'input_tokens'  => $input_tokens,
                'output_tokens' => $output_tokens,
                'total_tokens'  => $total_tokens,
                'message'       => $usage_message,
                'raw_usage'     => $usage
             ];
        }

        // Fallback when usage information is not available
        $fallback_message = sprintf(
            __( 'Successfully generated %d image(s) using %s model. Token usage information not available.', 'essential-blocks' ),
            $image_count,
            strtoupper( $model )
        );

        return [
            'input_tokens'  => null,
            'output_tokens' => null,
            'total_tokens'  => null,
            'message'       => $fallback_message,
            'raw_usage'     => null
         ];
    }

    /**
     * Determine optimal model based on parameters
     *
     * @param string $requested_model The originally requested model
     * @param string $size Image size
     * @param string $quality Image quality
     * @param string $style Image style
     * @param string $background Background setting
     * @param string $output_format Output format
     * @param string $output_compression Output compression
     * @return string The optimal model to use
     */
    private function determine_optimal_model( $requested_model, $size, $quality, $style, $background, $output_format, $output_compression )
    {
        // Priority 1: If background is not 'auto', must use gpt-image-1
        if ( ! empty( $background ) && $background !== 'auto' ) {
            return 'gpt-image-1';
        }

        // Priority 2: If output_format or output_compression is not default, must use gpt-image-1
        if ( ( ! empty( $output_format ) && $output_format !== 'png' ) ||
            ( ! empty( $output_compression ) && $output_compression !== 'standard' ) ) {
            return 'gpt-image-1';
        }

        // Priority 3: If style is 'vivid' or 'natural', must use dall-e-3
        if ( ! empty( $style ) && ( $style === 'vivid' || $style === 'natural' ) ) {
            return 'dall-e-3';
        }

        // Priority 4: Size-based selection
        $dalle_e2_sizes   = [ '256x256', '512x512' ];
        $dalle_e3_sizes   = [ '1792x1024', '1024x1792' ];
        $gpt_image1_sizes = [ '1536x1024', '1024x1536', 'auto' ];

        if ( in_array( $size, $dalle_e2_sizes ) ) {
            return 'dall-e-2';
        }

        if ( in_array( $size, $dalle_e3_sizes ) ) {
            return 'dall-e-3';
        }

        if ( in_array( $size, $gpt_image1_sizes ) ) {
            return 'gpt-image-1';
        }

        // For 1024x1024 or other sizes, default to gpt-image-1 unless style forces dall-e-3
        return 'gpt-image-1';
    }

    /**
     * Filter parameters based on model capabilities
     *
     * @param string $model The selected model
     * @param string $size Image size
     * @param string $quality Image quality
     * @param string $style Image style
     * @param string $background Background setting
     * @param string $output_format Output format
     * @param string $output_compression Output compression
     * @return array Filtered parameters
     */
    private function filter_parameters_by_model( $model, $size, $quality, $style, $background, $output_format, $output_compression )
    {
        $filtered = [
            'size'               => $size,
            'quality'            => $quality,
            'style'              => $style,
            'background'         => $background,
            'output_format'      => $output_format,
            'output_compression' => $output_compression
         ];

        switch ( $model ) {
            case 'dall-e-2':
                // DALL-E 2: Only supports size and prompt
                $filtered[ 'quality' ]            = 'standard'; // Reset to default
                $filtered[ 'style' ]              = 'none'; // Reset to none
                $filtered[ 'background' ]         = 'auto'; // Reset to auto
                $filtered[ 'output_format' ]      = 'png'; // Reset to default
                $filtered[ 'output_compression' ] = 'standard'; // Reset to default

                // Validate size for DALL-E 2
                $valid_sizes = [ '256x256', '512x512', '1024x1024' ];
                if ( ! in_array( $size, $valid_sizes ) ) {
                    $filtered[ 'size' ] = '1024x1024'; // Default fallback
                }
                break;

            case 'dall-e-3':
                // DALL-E 3: Supports quality, style, size, prompt
                $filtered[ 'background' ]         = 'auto'; // Reset to auto
                $filtered[ 'output_format' ]      = 'png'; // Reset to default
                $filtered[ 'output_compression' ] = 'standard'; // Reset to default

                // Validate quality for DALL-E 3
                $valid_qualities = [ 'standard', 'hd' ];
                if ( ! in_array( $quality, $valid_qualities ) ) {
                    $filtered[ 'quality' ] = 'standard';
                }

                // Validate style for DALL-E 3
                $valid_styles = [ 'vivid', 'natural' ];
                if ( ! in_array( $style, $valid_styles ) ) {
                    $filtered[ 'style' ] = 'vivid'; // Default for DALL-E 3
                }

                // Validate size for DALL-E 3
                $valid_sizes = [ '1024x1024', '1792x1024', '1024x1792' ];
                if ( ! in_array( $size, $valid_sizes ) ) {
                    $filtered[ 'size' ] = '1024x1024'; // Default fallback
                }
                break;

            case 'gpt-image-1':
                // GPT-Image-1: Supports all parameters

                // Validate quality for GPT-Image-1
                $valid_qualities = [ 'high', 'medium', 'low' ];
                if ( ! in_array( $quality, $valid_qualities ) ) {
                    $filtered[ 'quality' ] = 'medium'; // Default for GPT-Image-1
                }

                // Validate background
                $valid_backgrounds = [ 'auto', 'transparent', 'opaque' ];
                if ( ! in_array( $background, $valid_backgrounds ) ) {
                    $filtered[ 'background' ] = 'auto';
                }

                // Validate output format
                $valid_formats = [ 'png', 'jpeg', 'webp' ];
                if ( ! in_array( $output_format, $valid_formats ) ) {
                    $filtered[ 'output_format' ] = 'png';
                }

                // Validate output compression
                $valid_compressions = [ 'standard', 'high', 'low', 'medium' ];
                if ( ! in_array( $output_compression, $valid_compressions ) ) {
                    $filtered[ 'output_compression' ] = 'standard';
                }
                // Validate output compression for PNG
                else if ( $filtered[ 'output_format' ] === 'png' ) {
                    $filtered[ 'output_compression' ] = 'standard';
                }

                // Validate size for GPT-Image-1
                $valid_sizes = [ '1024x1024', '1536x1024', '1024x1536', 'auto' ];
                if ( ! in_array( $size, $valid_sizes ) ) {
                    $filtered[ 'size' ] = 'auto'; // Default fallback
                }

                // Reset style to none for GPT-Image-1
                $filtered[ 'style' ] = 'none';
                break;
        }

        return $filtered;
    }

    /**
     * Generate metadata for an image based on its prompt
     *
     * @param string $revised_prompt The revised prompt from DALL-E
     * @param string $original_prompt The original user prompt
     * @return array Array containing title, alt_tag, caption, and description
     */
    private function generate_image_metadata( $revised_prompt, $original_prompt )
    {
        // If API key is not available, return default metadata
        if ( empty( $this->api_key ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        // Create a prompt for generating metadata
        $metadata_prompt = "Based on this image description: \"{$revised_prompt}\"\n\n" .
            "Generate appropriate metadata for this image in the following JSON format:\n" .
            "{\n" .
            "  \"title\": \"A concise, descriptive title (max 60 characters)\",\n" .
            "  \"alt_tag\": \"Descriptive alt text for accessibility (max 125 characters)\",\n" .
            "  \"caption\": \"A brief caption describing the image (max 200 characters)\",\n" .
            "  \"description\": \"A detailed description of the image (max 300 characters)\"\n" .
            "}\n\n" .
            "Make sure the JSON is valid and all fields are filled. Focus on being descriptive but concise.";

        // Prepare the request body for metadata generation
        $body = [
            'model'       => $this->model,
            'messages'    => [
                [
                    'role'    => 'system',
                    'content' => 'You are an expert at creating image metadata. Always respond with valid JSON only, no additional text.'
                 ],
                [
                    'role'    => 'user',
                    'content' => $metadata_prompt
                 ]
             ],
            'temperature' => 0.3, // Lower temperature for more consistent output
            'max_tokens'  => 300
         ];

        // Make the API request for metadata
        $response = wp_remote_post(
            $this->api_endpoint,
            [
                'headers'     => [
                    'Content-Type'  => 'application/json',
                    'Authorization' => 'Bearer ' . $this->api_key
                 ],
                'body'        => wp_json_encode( $body ),
                'timeout'     => 30,
                'data_format' => 'body'
             ]
        );

        // Check for errors or invalid response
        if ( is_wp_error( $response ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
        $response_code = wp_remote_retrieve_response_code( $response );

        if ( $response_code !== 200 || ! isset( $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ] ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        // Parse the JSON response
        $metadata_json = $response_body[ 'choices' ][ 0 ][ 'message' ][ 'content' ];
        $metadata      = json_decode( $metadata_json, true );

        // Validate the metadata structure
        if ( ! is_array( $metadata ) ||
            ! isset( $metadata[ 'title' ] ) ||
            ! isset( $metadata[ 'alt_tag' ] ) ||
            ! isset( $metadata[ 'caption' ] ) ||
            ! isset( $metadata[ 'description' ] ) ) {
            return $this->get_default_image_metadata( $original_prompt );
        }

        // Sanitize and truncate the metadata fields
        return [
            'title'       => sanitize_text_field( substr( $metadata[ 'title' ], 0, 60 ) ),
            'alt_tag'     => sanitize_text_field( substr( $metadata[ 'alt_tag' ], 0, 125 ) ),
            'caption'     => sanitize_text_field( substr( $metadata[ 'caption' ], 0, 200 ) ),
            'description' => sanitize_text_field( substr( $metadata[ 'description' ], 0, 300 ) )
         ];
    }

    /**
     * Get default image metadata when AI generation fails
     *
     * @param string $prompt The original prompt
     * @return array Default metadata array
     */
    private function get_default_image_metadata( $prompt )
    {
        // Create basic metadata from the prompt
        $clean_prompt = sanitize_text_field( $prompt );
        $title        = substr( $clean_prompt, 0, 60 );

        return [
            'title'       => $title ?: __( 'AI Generated Image', 'essential-blocks' ),
            'alt_tag'     => substr( $clean_prompt, 0, 125 ) ?: __( 'AI generated image', 'essential-blocks' ),
            'caption'     => substr( $clean_prompt, 0, 200 ) ?: __( 'Image generated using AI', 'essential-blocks' ),
            'description' => substr( $clean_prompt, 0, 300 ) ?: __( 'This image was generated using artificial intelligence based on a text prompt.', 'essential-blocks' )
         ];
    }

    /**
     * Prepare system message based on tone and length
     *
     * @param string $tone
     * @param string $length
     * @return string
     */
    private function prepare_system_message( $tone, $length )
    {
        $tone_instructions   = $this->get_tone_instructions( $tone );
        $length_instructions = $this->get_length_instructions( $length );

        return "You are a professional content writer. " .
            "Write content that is {$tone_instructions}. " .
            "{$length_instructions} " .
            "Format the content with proper headings, paragraphs, and bullet points where appropriate. " .
            "The content should be engaging, well-structured, and optimized for web reading.";
    }

    /**
     * Prepare user message with prompt and keywords
     *
     * @param string $prompt
     * @param string $keywords
     * @return string
     */
    private function prepare_user_message( $prompt, $keywords )
    {
        $message = "Write content about: {$prompt}";

        if ( ! empty( $keywords ) ) {
            $message .= "\n\nInclude the following keywords in the content: {$keywords}";
        }

        return $message;
    }

    /**
     * Get tone instructions based on selected tone
     *
     * @param string $tone
     * @return string
     */
    private function get_tone_instructions( $tone )
    {
        switch ( $tone ) {
            case 'casual':
                return "conversational and friendly, using a casual tone";
            case 'formal':
                return "professional and formal, using proper language";
            case 'persuasive':
                return "persuasive and compelling, designed to convince the reader";
            case 'informative':
            default:
                return "informative and educational, focusing on providing valuable information";
        }
    }

    /**
     * Get length instructions based on selected length
     *
     * @param string $length
     * @return string
     */
    private function get_length_instructions( $length )
    {
        switch ( $length ) {
            case 'short':
                return "Keep the content concise and to the point, around 150-250 words.";
            case 'long':
                return "Create comprehensive content with detailed explanations, around 500-800 words.";
            case 'medium':
            default:
                return "Write a moderate-length content of approximately 300-500 words.";
        }
    }

    /**
     * Get max tokens based on selected length
     *
     * This method is kept for backward compatibility but is no longer used directly.
     * The max_tokens value from settings is used instead.
     *
     * @param string $length
     * @return int
     */
    private function get_max_tokens_by_length( $length )
    {
        switch ( $length ) {
            case 'short':
                return 350;
            case 'long':
                return 1200;
            case 'medium':
            default:
                return 800;
        }
    }
}
