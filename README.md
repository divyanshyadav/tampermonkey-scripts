# Tampermonkey Scripts

A collection of useful Tampermonkey userscripts to enhance your browsing experience.

## Scripts

### Gmail Keyboard Shortcuts

**File:** `src/gmail-shortcuts.js`

A Tampermonkey userscript that adds keyboard shortcut functionality to Gmail, allowing you to delete individual emails using the Delete key.

#### Features

- **Keyboard Shortcut**: Press the Delete key to delete the currently selected email
- **Smart Button Detection**: Automatically finds the delete button using multiple selector strategies
- **Visual Feedback**: Shows success/error notifications when deleting emails
- **Gmail SPA Support**: Works with Gmail's single-page application navigation
- **Non-intrusive**: Minimal impact on Gmail's existing functionality

#### Installation

1. Install the [Tampermonkey browser extension](https://www.tampermonkey.net/)
2. Open Tampermonkey dashboard
3. Click "Create a new script"
4. Copy and paste the contents of `src/gmail-shortcuts.js`
5. Save the script (Ctrl+S or Cmd+S)
6. Navigate to Gmail and the script will automatically activate

#### Usage

1. Open Gmail in your browser
2. Select an email from your inbox
3. Press the **Delete key** on your keyboard
4. The email will be deleted and you'll see a confirmation notification

#### Browser Compatibility

- Chrome/Chromium (with Tampermonkey extension)
- Firefox (with Tampermonkey extension)
- Edge (with Tampermonkey extension)
- Safari (with Tampermonkey extension)

#### Troubleshooting

- **Script not working**: Ensure Tampermonkey is enabled and the script is active
- **Delete button not found**: The script will show a notification if it can't locate the delete button
- **Gmail updates**: The script automatically handles Gmail's dynamic content updates

#### Development

To modify or extend this script:

1. Edit the source file in `src/gmail-shortcuts.js`
2. Test changes in Tampermonkey's editor
3. Save and reload Gmail to test modifications

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve these scripts.

## License

This project is open source. Please check individual script headers for specific licensing information.
