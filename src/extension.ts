import * as vscode from 'vscode';

function createDecorationType(color: string): vscode.TextEditorDecorationType {
  return vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor('titleBar.activeBackground'),
    color,
    fontStyle: 'normal',
    isWholeLine: true,
    overviewRulerColor: color,
    overviewRulerLane: vscode.OverviewRulerLane.Right,
  });
}

export function activate(context: vscode.ExtensionContext) {
  const patterns = [
    { name: 'curly', color: '#d19a66', regex: /^\s*\/\/\s*\{.*\}/ },
    { name: 'square', color: '#61afef', regex: /^\s*\/\/\s*\[.*\]/ },
    { name: 'paren', color: '#98c379', regex: /^\s*\/\/\s*\(.*\)/ },
    { name: 'star', color: '#c678dd', regex: /^\s*\/\/\s*\*.*\*/ },
    { name: 'dash', color: '#e06c75', regex: /^\s*\/\/\s*-.*-/ },
    { name: 'plus', color: '#e5c07b', regex: /^\s*\/\/\s*\+.*\+/ },
    { name: 'angle', color: '#56b6c2', regex: /^\s*\/\/\s*<.*>/ },
    { name: 'bar', color: '#cccccc', regex: /^\s*\/\/\s*\#.*\#/ },
  ];

  const decorationTypes = Object.fromEntries(patterns.map(({ name, color }) => [name, createDecorationType(color)]));

  const updateDecorations = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const matches = Object.fromEntries(patterns.map(({ name }) => [name, [] as vscode.DecorationOptions[]]));

    for (let i = 0; i < editor.document.lineCount; i++) {
      const line = editor.document.lineAt(i);
      const text = line.text;

      for (const { name, regex } of patterns) {
        if (regex.test(text)) {
          matches[name].push({ range: new vscode.Range(i, 0, i, text.length) });
          break;
        }
      }
    }

    for (const { name } of patterns) {
      editor.setDecorations(decorationTypes[name], matches[name]);
    }
  };

  if (vscode.window.activeTextEditor) {
    updateDecorations();
  }

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateDecorations();
      }
    }),

    vscode.window.onDidChangeActiveTextEditor(() => {
      updateDecorations();
    }),

    vscode.window.onDidChangeTextEditorSelection(() => {
      updateDecorations();
    })
  );
}

export function deactivate() {}
