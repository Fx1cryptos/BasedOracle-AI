'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsMetric {
  label: string;
  value: string | number;
  unit?: string;
  change24h?: number;
  change7d?: number;
  trend?: 'up' | 'down';
}

interface AnalyticsCardProps {
  metrics: AnalyticsMetric[];
  title?: string;
}

export function AnalyticsCard({
  metrics,
  title = 'Analytics',
}: AnalyticsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    {typeof metric.value === 'number'
                      ? metric.value.toLocaleString()
                      : metric.value}
                  </p>
                  {metric.unit && (
                    <p className="text-xs text-muted-foreground">{metric.unit}</p>
                  )}
                </div>
                {metric.change24h !== undefined && (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-xs font-semibold',
                      metric.change24h >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    )}
                  >
                    {metric.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(metric.change24h).toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
