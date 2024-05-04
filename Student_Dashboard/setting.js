// Function to save settings
function saveSettings() {
  const darkMode = document.getElementById("dark-mode-toggle").checked;
  const language = document.getElementById("language-select").value;
  const name = document.getElementById("name-input").value;

  // Normally you would save these settings somewhere, for example in localStorage or send them to a server
  console.log("Settings saved:");
  console.log("Dark Mode:", darkMode);
  console.log("Language:", language);
  console.log("Name:", name);
}
