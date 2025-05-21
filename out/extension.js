"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function createDecorationType(color) {
    return vscode.window.createTextEditorDecorationType({
        backgroundColor: new vscode.ThemeColor('titleBar.activeBackground'),
        color,
        fontStyle: 'normal',
        isWholeLine: true,
        overviewRulerColor: color,
        overviewRulerLane: vscode.OverviewRulerLane.Right,
    });
}
function activate(context) {
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
        const matches = Object.fromEntries(patterns.map(({ name }) => [name, []]));
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
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            updateDecorations();
        }
    }), vscode.window.onDidChangeActiveTextEditor(() => {
        updateDecorations();
    }), vscode.window.onDidChangeTextEditorSelection(() => {
        updateDecorations();
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map