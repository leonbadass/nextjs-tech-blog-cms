import {
  DecoratorNode,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from 'lexical';
import * as React from 'react';

type ImagePayload = {
  src: string;
  altText?: string;
};

export class ImageNode extends DecoratorNode<React.JSX.Element> {
  __src: string;
  __altText: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  constructor(src: string, altText = '', key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const img = document.createElement('img');
    img.src = this.__src;
    img.alt = this.__altText;
    img.className = 'my-4 rounded shadow max-w-full';
    return img;
  }

  updateDOM(): boolean {
    return false;
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
    } as any;
  }

  static importJSON(serializedNode: any): ImageNode {
    const { src, altText } = serializedNode;
    return new ImageNode(src, altText);
  }

  decorate(): React.JSX.Element {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        className="my-4 rounded shadow max-w-full"
      ></img>
    );
  }
}

export function $createImageNode(payload: ImagePayload): ImageNode {
  return new ImageNode(payload.src, payload.altText);
}

export function $isImageNode(node: LexicalNode): node is ImageNode {
  return node instanceof ImageNode;
}
