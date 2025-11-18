const { createClient } = require('@supabase/supabase-js');

// Mock the Supabase client for testing
const supabaseUrl = 'https://your-project.supabase.co'; // Replace with actual URL
const supabaseKey = 'your-anon-key'; // Replace with actual key
const supabase = createClient(supabaseUrl, supabaseKey);

// Test data
const testData = {
  name: "João Silva",
  phone: "(11) 99999-9999", // Formatted phone
  service: "corte",
  date: "2024-12-01",
  time: "10:00"
};

console.log("Testing phone validation with formatted input:");
console.log("Input phone:", testData.phone);

// Simulate the transform logic from the function
const transformedPhone = testData.phone.replace(/\D/g, '');
console.log("Transformed phone:", transformedPhone);

// Test regex
const phoneRegex = /^\d{10,11}$/;
const isValid = phoneRegex.test(transformedPhone);
console.log("Is valid:", isValid);

if (isValid) {
  console.log("✅ Phone validation passed!");
} else {
  console.log("❌ Phone validation failed!");
}

// Test with unformatted phone
const unformattedPhone = "11999999999";
console.log("\nTesting with unformatted phone:");
console.log("Input phone:", unformattedPhone);
const transformedUnformatted = unformattedPhone.replace(/\D/g, '');
console.log("Transformed phone:", transformedUnformatted);
const isValidUnformatted = phoneRegex.test(transformedUnformatted);
console.log("Is valid:", isValidUnformatted);

if (isValidUnformatted) {
  console.log("✅ Unformatted phone validation passed!");
} else {
  console.log("❌ Unformatted phone validation failed!");
}
