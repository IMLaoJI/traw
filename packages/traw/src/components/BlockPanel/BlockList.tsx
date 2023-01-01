import BlockItem from 'components/BlockPanel/BlockItem';
import { useTrawApp } from 'hooks';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TrawSnapshot } from 'types';
import EmptyBlockPanel from './EmptyBlockPanel';
export interface BlockListProps {
  handlePlayClick: (blockId: string) => void;
  isRecording: boolean;
  EmptyVoiceNote?: React.ReactNode;
}

export default function BlockList({ handlePlayClick, isRecording, EmptyVoiceNote }: BlockListProps) {
  const app = useTrawApp();
  const blocks = app.useStore((state: TrawSnapshot) => state.blocks);
  const blocksRef = useRef<any>({});

  const sortedBlocks = useMemo(() => {
    return Object.values(blocks).sort((a, b) => a.time - b.time);
  }, [blocks]);

  const [beforeBlockLength, setBeforeBlockLength] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      setTimeout(() => {
        blocksRef.current[sortedBlocks[index].id].scrollIntoView({ behavior: 'smooth' });
      });
    },
    [sortedBlocks],
  );

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
    <div className="mt-4 flex-2 flex-auto w-full overflow-y-auto min-h-0 px-2">
      <ul className="flex flex-col gap-4">
        {sortedBlocks.map((block) => (
          <BlockItem
            setRef={(ref) => {
              blocksRef.current[block.id] = ref;
            }}
            key={block.id}
            userId={block.userId}
            date={block.time}
            blockId={block.id}
            blockText={block.text}
            isVoiceBlock={block.voices.length > 0}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </ul>
    </div>
  );
}
