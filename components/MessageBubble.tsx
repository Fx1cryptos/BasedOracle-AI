'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
  isLoading?: boolean;
}

export function MessageBubble({
  content,
  role,
  timestamp,
  isLoading,
}: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-secondary text-secondary-foreground rounded-bl-none'
        )}
      >
        {isLoading ? (
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-200" />
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <Markdown
              components={{
                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ node, inline, ...props }) =>
                  inline ? (
                    <code className="bg-opacity-20 px-1 rounded" {...props} />
                  ) : (
                    <code className="block bg-opacity-20 p-2 rounded mb-2" {...props} />
                  ),
              }}
            >
              {content}
            </Markdown>
          </div>
        )}
        {timestamp && (
          <div className="text-xs opacity-70 mt-2">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
