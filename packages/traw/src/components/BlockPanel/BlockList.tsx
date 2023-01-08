import BlockItem from 'components/BlockPanel/BlockItem';
import { useTrawApp } from 'hooks';
import { PlayModeType, TrawSnapshot } from 'types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EmptyBlockPanel from './EmptyBlockPanel';
import { Virtuoso } from 'react-virtuoso';
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';
export interface BlockListProps {
  handlePlayClick: (blockId: string) => void;
  isRecording: boolean;
  EmptyVoiceNote?: React.ReactNode;
}

export default function BlockList({ handlePlayClick, isRecording, EmptyVoiceNote }: BlockListProps) {
  const app = useTrawApp();
  const blocks = app.useStore((state: TrawSnapshot) => state.blocks);
  const targetBlockId = app.useStore((state: TrawSnapshot) =>
    state.player.mode === PlayModeType.PLAYING ? state.player.targetBlockId : undefined,
  );
  const virtuosoRef = useRef(null);
  const domRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  const sortedBlocks = useMemo(() => {
    return Object.values(blocks)
      .filter((block) => block.isActive)
      .sort((a, b) => a.time - b.time);
  }, [blocks]);

  const [beforeBlockLength, setBeforeBlockLength] = useState(0);

  const handleResize = useCallback(() => {
    const height = domRef.current?.offsetHeight || 0;

    setHeight(height);
  }, []);
  useEventListener('resize', handleResize);
  useIsomorphicLayoutEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domRef.current]);

  const scrollTo = useCallback((index: number) => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        (virtuosoRef.current as any).scrollToIndex({ index, align: 'center', behavior: 'smooth' });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const newBlockLength = sortedBlocks.length;

    if (beforeBlockLength < newBlockLength) {
      scrollTo(newBlockLength - 1);
    }
    setBeforeBlockLength(newBlockLength);
  }, [sortedBlocks, beforeBlockLength, scrollTo]);

  if (sortedBlocks.length === 0 && !isRecording) {
    return <EmptyBlockPanel EmptyVoiceNote={EmptyVoiceNote} />;
  }

  return (
    <div className="mt-2 md:mt-4 flex-2 flex-auto w-full overflow-y-auto min-h-0 pl-0 md:pl-2" ref={domRef}>
      <Virtuoso
        data={sortedBlocks}
        style={{ height: `${height}px`, minHeight: '100%' }}
        totalCount={sortedBlocks.length}
        overscan={5}
        ref={virtuosoRef}
        itemContent={(index, block) => {
          return (
            <BlockItem
              key={block.id}
              userId={block.userId}
              date={block.time}
              blockId={block.id}
              blockText={block.text}
              isPlaying={targetBlockId === block.id}
              isVoiceBlock={block.voices.length > 0}
              handlePlayClick={handlePlayClick}
              beforeBlockUserId={sortedBlocks[index - 1]?.userId}
            />
          );
        }}
      />
    </div>
  );
}
