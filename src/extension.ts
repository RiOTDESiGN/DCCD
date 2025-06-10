import * as VS from 'vscode';

function createDecorationType(color: string, style: string, weight: string): VS.TextEditorDecorationType {
  return VS.window.createTextEditorDecorationType({
    backgroundColor: new VS.ThemeColor('titleBar.activeBackground'),
    color,
    fontStyle: style,
    fontWeight: weight,
    isWholeLine: true,
    overviewRulerColor: color,
    overviewRulerLane: VS.OverviewRulerLane.Right,
  });
}

export function activate(context: VS.ExtensionContext) {
  const config = VS.workspace.getConfiguration('dccd');
  const patterns = [
    {
      name: 'paren',
      color: config.get('colors.paren', '#98c379'),
      style: config.get('styles.paren', 'normal'),
      weight: config.get('weights.paren', 'bold'),
      regex: /^\s*\/\/\s*\([^'"]*\).*$/,
    },
    {
      name: 'angle',
      color: config.get('colors.angle', '#56b6c2'),
      style: config.get('styles.angle', 'normal'),
      weight: config.get('weights.angle', 'bold'),
      regex: /^\s*\/\/\s*<[^'"]*>.*$/,
    },
    {
      name: 'curly',
      color: config.get('colors.curly', '#d19a66'),
      style: config.get('styles.curly', 'normal'),
      weight: config.get('weights.curly', 'bold'),
      regex: /^\s*\/\/\s*\{[^'"]*\}.*$/,
    },
    {
      name: 'square',
      color: config.get('colors.square', '#61afef'),
      style: config.get('styles.square', 'normal'),
      weight: config.get('weights.square', 'bold'),
      regex: /^\s*\/\/\s*\[[^'"]*\].*$/,
    },
    {
      name: 'bar',
      color: config.get('colors.bar', '#cccccc'),
      style: config.get('styles.bar', 'normal'),
      weight: config.get('weights.bar', 'bold'),
      regex: /^\s*\/\/.*#{3,}.*$/,
    },
    {
      name: 'star',
      color: config.get('colors.star', '#c678dd'),
      style: config.get('styles.star', 'normal'),
      weight: config.get('weights.star', 'bold'),
      regex: /^\s*\/\/.*\*{3,}.*$/,
    },
    {
      name: 'plus',
      color: config.get('colors.plus', '#e5c07b'),
      style: config.get('styles.plus', 'normal'),
      weight: config.get('weights.plus', 'bold'),
      regex: /^\s*\/\/.*\+{3,}.*$/,
    },
    {
      name: 'dash',
      color: config.get('colors.dash', '#e06c75'),
      style: config.get('styles.dash', 'normal'),
      weight: config.get('weights.dash', 'bold'),
      regex: /^\s*\/\/.*-{3,}.*$/,
    },
  ];

  const decorationTypes = Object.fromEntries(patterns.map(({ name, color, style, weight }) => [name, createDecorationType(color, style, weight)]));

  const updateDecorations = () => {
    const editor = VS.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const matches = Object.fromEntries(patterns.map(({ name }) => [name, [] as VS.DecorationOptions[]]));

    for (let i = 0; i < editor.document.lineCount; i++) {
      const line = editor.document.lineAt(i);
      const text = line.text;

      for (const { name, regex } of patterns) {
        if (regex.test(text)) {
          matches[name].push({ range: new VS.Range(i, 0, i, text.length) });
          break;
        }
      }
    }

    for (const { name } of patterns) {
      editor.setDecorations(decorationTypes[name], matches[name]);
    }
  };

  if (VS.window.activeTextEditor) {
    updateDecorations();
  }

  context.subscriptions.push(
    VS.workspace.onDidChangeTextDocument((event) => {
      const editor = VS.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateDecorations();
      }
    }),

    VS.window.onDidChangeActiveTextEditor(() => {
      updateDecorations();
    }),

    VS.window.onDidChangeTextEditorSelection(() => {
      updateDecorations();
    })
  );
}

export function deactivate() {}
