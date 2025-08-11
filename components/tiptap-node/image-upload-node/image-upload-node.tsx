'use client'

import * as React from 'react'
import { useState } from 'react'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { isValidPosition } from '@/lib/tiptap-utils'
import type { Image } from '@/app/types/image'
import ImageSelectorModal from '@/app/component/ImageSelectorModal' // adjust path if needed

import '@/components/tiptap-node/image-upload-node/image-upload-node.scss'

// Icons (unchanged)
const CloudUploadIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="tiptap-image-upload-icon">
    <path d="M11.1953 4.41771C10.3478 4.08499..." fill="currentColor" />
    <path d="M11 14.4142V21..." fill="currentColor" />
  </svg>
)

const FileIcon: React.FC = () => (
  <svg width="43" height="57" viewBox="0 0 43 57" fill="currentColor" className="tiptap-image-upload-dropzone-rect-primary">
    <path d="M0.75 10.75C0.75 5.64137..." />
  </svg>
)

const FileCornerIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="tiptap-image-upload-dropzone-rect-secondary">
    <path d="M0 0.75H0.343146..." />
  </svg>
)

// DropZoneContent: visually identical, no upload logic
const DropZoneContent: React.FC = () => (
  <>
    <div className="tiptap-image-upload-dropzone">
      <FileIcon />
      <FileCornerIcon />
      <div className="tiptap-image-upload-icon-container">
        <CloudUploadIcon />
      </div>
    </div>

    <div className="tiptap-image-upload-content">
      <span className="tiptap-image-upload-text">
        <em>Select Image</em>
      </span>
    </div>
  </>
)

export const ImageUploadNode: React.FC<NodeViewProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleImageSelect = (image: Image) => {
    const pos = props.getPos()
    if (!isValidPosition(pos)) return

    props.editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + 1 }) // remove the image placeholder node
      .insertContentAt(pos, {
        type: 'image',
        attrs: {
          src: image.url,
          alt: image.alt_text || '',
          title: image.alt_text || '',
        },
      })
      .run()
  }

  return (
    <>
      <NodeViewWrapper
        className="tiptap-image-upload"
        tabIndex={0}
        onClick={() => setModalOpen(true)}
      >
        <DropZoneContent />
      </NodeViewWrapper>

      <ImageSelectorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleImageSelect}
      />
    </>
  )
}

