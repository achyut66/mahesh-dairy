# Essential Blocks Post Grid - POST Method Update

## Overview
This update modifies the Essential Blocks post grid REST API to use POST method instead of GET method to resolve 403 Forbidden errors when 7G or 8G firewalls are enabled on servers.

## Problem
The original implementation used GET requests with complex query parameters:
```
essential-blocks/v1/queries?query_data=${complexJSON}&attributes=${moreComplexJSON}
```

This triggered 7G/8G firewall rules because:
- Complex JSON data in query parameters
- Long query strings
- Parameter names like `query_data` that resemble SQL injection attempts

## Solution
Updated to use POST method with data in request body:
```javascript
apiFetch({
    path: 'essential-blocks/v1/queries',
    method: 'POST',
    data: {
        query_data: queryData,
        attributes: attributes,
        pageNumber: pageNumber
    }
})
```

## Files Modified

### 1. Frontend JavaScript
**File:** `wp-content/plugins/essential-blocks/src/blocks/post-grid/src/frontend.js`
- Changed all `apiFetch` calls from GET to POST
- Moved query parameters to request body
- Added error handling with `.catch()`

### 2. Backend API Handler
**File:** `wp-content/plugins/essential-blocks/includes/API/PostBlock.php`
- Added POST route registration
- Updated `get_posts()` method to handle both GET and POST
- Added input validation and sanitization
- Added proper error handling with WP_Error

### 3. API Base Class
**File:** `wp-content/plugins/essential-blocks/includes/API/Base.php`
- Added `verify_post_permission()` method for POST requests
- Enhanced security for POST endpoints

## Benefits

### Firewall Compatibility
- ✅ Bypasses 7G/8G firewall query string rules
- ✅ Reduces 403 Forbidden errors
- ✅ Better server compatibility

### Security Improvements
- ✅ Input validation and sanitization
- ✅ JSON validation
- ✅ Proper error handling
- ✅ Request method validation

### Backward Compatibility
- ✅ GET method still supported
- ✅ Existing implementations continue to work
- ✅ Gradual migration possible

## Testing
1. Test with 7G/8G firewall enabled
2. Verify pagination works
3. Test category filtering
4. Check error handling
5. Confirm backward compatibility

## Migration Notes
- No immediate action required for existing sites
- POST method is used automatically for new requests
- GET method remains as fallback for compatibility
- Monitor server logs for any issues

## Technical Details
- POST requests send data in request body (not URL)
- JSON validation prevents malformed data
- Sanitization prevents XSS and injection attacks
- Error responses use proper HTTP status codes
