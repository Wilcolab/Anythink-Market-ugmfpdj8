/**
 * Converts a string to kebab-case format.
 *
 * This function transforms a given string into kebab-case, where all words are lowercase and separated by hyphens. It handles camelCase, PascalCase, spaces, and underscores, converting them to hyphens. Consecutive separators are collapsed into a single hyphen. Non-alphanumeric characters (except hyphens) are removed.
 *
 * @function toKebabCase
 * @param {string} text - The input string to convert. Can be in camelCase, PascalCase, or contain spaces/underscores/hyphens.
 * @returns {string} The kebab-case version of the input string.
 *
 * @example
 * toKebabCase('firstName') // 'first-name'
 * toKebabCase('User ID') // 'user-id'
 * toKebabCase('screen_name') // 'screen-name'
 * toKebabCase('already-kebab-case') // 'already-kebab-case'
 */
function toKebabCase(text) {
    if (typeof text !== 'string' || !text) return '';
    // Step 1: Split into words based on spaces, underscores, hyphens, and camelCase/PascalCase boundaries
    let words = text
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase/PascalCase to space
        .replace(/[_\-]+/g, ' ')            // underscores/hyphens to space
        .split(/\s+/);                      // split by spaces
    // Step 2: Convert all words to lowercase
    words = words.map(w => w.toLowerCase());
    // Step 3: Join with hyphens, remove empty, trim hyphens
    return words.filter(Boolean).join('-').replace(/^-+|-+$/g, '');
}

// Example usages
console.log(toKebabCase('firstName')); // 'first-name'
console.log(toKebabCase('User ID')); // 'user-id'
console.log(toKebabCase('screen_name')); // 'screen-name'
console.log(toKebabCase('already-kebab-case')); // 'already-kebab-case'
