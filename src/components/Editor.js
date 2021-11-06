import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import '../styles/editor.css';

// const inputAreaStyle = {
//     width: "50%",
//     height: "100vh",
//     padding: "20px",
//     fontSize: "2rem",
//     outline: "none"
// }

const Editor = () => {

  const [mardownCode, setMarkdownCode] = useState("## code here")

  // const textareaStyle = {
  //     height: "100vh";

  // }

  const handleMarkdownCodeChange = (event) => {
    setMarkdownCode(event.target.value)
  }

  return (
    <div className="panel">
      {/* INPUT */}
      <textarea
        className="textarea"
        autoFocus
        value={mardownCode}
        onChange={(e) => handleMarkdownCodeChange(e)}
      />

      {/* PREVIEW */}
      <ReactMarkdown
        className="markdown"
        children={mardownCode}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={docco}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </div>
  )
}



export default Editor
