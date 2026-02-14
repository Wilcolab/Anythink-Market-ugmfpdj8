/**
 * Converts a string to camelCase format with robust handling of edge cases.
 *
 * This function transforms a given string into camelCase, where the first word is lowercase and subsequent words are capitalized, removing all spaces, hyphens, and underscores. It also removes non-alphanumeric characters from each word, trims whitespace, and safely handles null, undefined, and non-string inputs by returning an empty string. Consecutive separators are treated as a single word boundary.
 *
 * @function camelCase
 * @param {string} input - The string to convert. Can include spaces, hyphens, underscores, or mixed casing. Non-string, null, or undefined values are safely handled.
 * @returns {string} The camelCased string. Returns an empty string for invalid or empty input.
 *
 * @example
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('  multiple   separators---here__') // 'multipleSeparatorsHere'
 * camelCase('AlreadyCamelCase') // 'alreadyCamelCase'
 * camelCase('') // ''
 * camelCase(null) // ''
 * camelCase(undefined) // ''
 * camelCase('user@name!') // 'userName'
 */
function camelCase(input) {
    // Handle null and undefined
    if (input == null) {
        return '';
    }

    // Validate input is a string
    if (typeof input !== 'string') {
        return '';
    }

    // Trim leading and trailing whitespace
    let trimmed = input.trim();

    // If empty after trimming, return empty string
    if (trimmed.length === 0) {
        return '';
    }

    // Replace consecutive separators with single space
    // Separators: spaces, hyphens, underscores
    trimmed = trimmed.replace(/[-_\s]+/g, ' ');

    // Remove leading and trailing separators (converted to spaces)
    trimmed = trimmed.trim();

    // Split by separators to get words
    const words = trimmed.split(/[-_\s]+/);

    // Filter out empty strings
    const filteredWords = words.filter(word => word.length > 0);

    if (filteredWords.length === 0) {
        return '';
    }

    // Process each word
    const processedWords = filteredWords.map((word, index) => {
        // Remove non-alphanumeric characters
        const cleaned = word.replace(/[^a-zA-Z0-9]/g, '');

        if (cleaned.length === 0) {
            return '';
        }

        if (index === 0) {
            // First word: lowercase first letter, preserve rest
            return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
        }

        // Subsequent words: capitalize first letter, lowercase rest
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    });

    return processedWords.filter(word => word.length > 0).join('');
}

// Test cases
const testCases = [
    // Basic cases
    { input: 'hello world', expected: 'helloWorld' },
    { input: 'hello-world', expected: 'helloWorld' },
    { input: 'hello_world', expected: 'helloWorld' },

    // Null and undefined
    { input: null, expected: '' },
    { input: undefined, expected: '' },

    // Empty and whitespace
    { input: '', expected: '' },
    { input: '   ', expected: '' },
    { input: '---', expected: '' },
    { input: '___', expected: '' },

    // Leading and trailing whitespace/separators
    { input: '  hello world  ', expected: 'helloWorld' },
    { input: '-hello-world-', expected: 'helloWorld' },
    { input: '_hello_world_', expected: 'helloWorld' },

    // Consecutive separators
    { input: 'hello--world', expected: 'helloWorld' },
    { input: 'hello__world', expected: 'helloWorld' },
    { input: 'hello   world', expected: 'helloWorld' },
    { input: 'hello-_- world', expected: 'helloWorld' },

    // Numbers
    { input: 'hello123world', expected: 'hello123world' },
    { input: 'hello 123 world', expected: 'hello123World' },
    { input: 'test-2-factor', expected: 'test2Factor' },

    // Special characters
    { input: 'hello@world', expected: 'helloworld' },
    { input: 'hello!world#test', expected: 'helloworldtest' },
    { input: 'hello@#$%world', expected: 'helloworld' },

    // Acronyms and consecutive uppercase
    { input: 'XMLHttpRequest', expected: 'xmlhttprequest' },
    { input: 'HTTP-request', expected: 'httprequest' },

    // Single word
    { input: 'hello', expected: 'hello' },
    { input: 'HELLO', expected: 'hello' },

    // Mixed cases
    { input: 'some_lengthy-example with-multiple   separators', expected: 'someLengthyExampleWithMultipleSeparators' },
];

// Run tests
console.log('Running camelCase tests:\n');
let passed = 0;
let failed = 0;

testCases.forEach(({ input, expected }, index) => {
    const result = camelCase(input);
    const isPass = result === expected;

    if (isPass) {
        passed++;
        console.log(`✓ Test ${index + 1} passed`);
    } else {
        failed++;
        console.log(
            `✗ Test ${index + 1} failed\n  Input: ${JSON.stringify(input)}\n  Expected: "${expected}"\n  Got: "${result}"`
        );
    }
});

console.log(`\n${passed} passed, ${failed} failed out of ${testCases.length} tests`);

module.exports = camelCase;
/**
 * Converts a string to dot.case format
 * @param {string} input - The string to convert
 * @returns {string} The dot.case string, or empty string for null/undefined
 */
function dotCase(input) {
    // Handle null and undefined
    if (input == null) {
        return '';
    }

    // Validate input is a string
    if (typeof input !== 'string') {
        return '';
    }

    // Trim leading and trailing whitespace
    let trimmed = input.trim();

    // If empty after trimming, return empty string
    if (trimmed.length === 0) {
        return '';
    }

    // Replace consecutive separators with single space
    trimmed = trimmed.replace(/[-_\s]+/g, ' ');

    // Remove leading and trailing separators
    trimmed = trimmed.trim();

    // Split by separators to get words
    const words = trimmed.split(/[-_\s]+/);

    // Filter out empty strings
    const filteredWords = words.filter(word => word.length > 0);

    if (filteredWords.length === 0) {
        return '';
    }

    // Process each word
    const processedWords = filteredWords.map(word => {
        // Remove non-alphanumeric characters
        const cleaned = word.replace(/[^a-zA-Z0-9]/g, '');
        return cleaned.toLowerCase();
    });

    return processedWords.filter(word => word.length > 0).join('.');
}

module.exports = { camelCase, dotCase };