'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Heart, MessageCircle } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'twitter' | 'farcaster';
  author: string;
  content: string;
  timestamp: string;
  engagement: {
    likes: number;
    retweets?: number;
  };
  url: string;
}

interface SocialFeedProps {
  posts: SocialPost[];
  title?: string;
}

export function SocialFeed({ posts, title = 'Social Feed' }: SocialFeedProps) {
  if (!posts || posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No posts available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 border rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                    {post.platform}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {post.author}
                  </span>
                </div>
                <p className="text-sm line-clamp-3 mb-2">{post.content}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.engagement.likes}
                  </span>
                  {post.engagement.retweets && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.engagement.retweets}
                    </span>
                  )}
                  <span className="ml-auto">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
