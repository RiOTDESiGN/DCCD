# Dynamic Code & Comment Divider

Enhance code readability with dynamic, theme-aware dividers for code and comments.  
Organize your workspace visually with customizable line highlights and section breaks.

---

## ✨ Features

- Highlight entire lines with distinct, theme-consistent backgrounds and foreground colors.
- Apply visual markers to different types of lines (e.g., comments, section headers, annotations).
- Easily differentiate code regions using colorful, semantic dividers.
- Find your comments or categories fast using scrollbar markers.
- Lightweight and fast – uses native VS Code decoration APIs.

> ![Divider Example](images/divider-examples.png)

---

## ⚙️ Extension Settings

This version currently does not expose settings via the UI, but future versions may include:

- Custom color configuration per divider type.
- Toggle activation on specific file types or languages.

---

## 🚀 Activation

The extension currently activates after VS Code startup and window reload.

---

## 📦 Requirements

No external dependencies are required. Works out of the box with any VS Code theme.

---

## 🐞 Known Issues

- Decorations may conflict visually with certain high-contrast themes.
- All lines matching regex patterns will be styled identically until per-type configs are introduced.

If you encounter unexpected behavior, feel free to open an issue on the repository (link coming soon).

---

## 📜 Release Notes

#### 1.4.1

- Internal refactor
- Readme and metadata updated for Marketplace

#### 1.4.0

- Added additional color types for dividers
- Improved performance and styling fidelity

#### 1.0.0

- Initial release with base divider types and decorations

---

## 🧩 Extension Info

- Name: dccd
- Display Name: Dynamic Code & Comment Divider
- Keywords: decorator, divider, highlight, comment, visual, code style

---

### Enjoy cleaner, more structured code with Dynamic Code & Comment Divider!
