'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

export default function BlockNoteEditor({ onChange }) {
  const editor = useCreateBlockNote({
    onChange: async () => {
      const html = await editor.blocksToHTMLLossy(editor.document);
      onChange(html);
    }
  });

  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}