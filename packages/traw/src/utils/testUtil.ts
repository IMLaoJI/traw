import { TrawDocument, TrawUser, TRBlock, TRBlockType, TRBlockVoice, TRRecord } from 'types';

export const TEST_USER_1: TrawUser = {
  id: 'user-1',
  name: 'Test User 1',
};

export const TEST_USER_2: TrawUser = {
  id: 'user-2',
  name: 'Test User 2',
};

export const TEST_DOCUMENT_1: TrawDocument = {
  id: 'document-1',
  name: 'Test Document 1 ',
  channelName: 'Channel',
  canEdit: true,
};

export const EXAMPLE_RECORDS: TRRecord[] = [
  {
    id: 'record-1',
    type: 'create_page',
    user: TEST_USER_1.id,
    slideId: 'slide-1',
    start: 0,
    end: 0,
    data: {
      id: 'slide-1',
    },
    origin: TEST_DOCUMENT_1.id,
  },
  {
    id: 'record-2',
    type: 'change_page',
    user: TEST_USER_1.id,
    slideId: 'slide-1',
    start: 0,
    end: 0,
    data: {
      id: 'slide-1',
    },
    origin: TEST_DOCUMENT_1.id,
  },
];

export const EXMPLE_BLOCKS: TRBlock[] = [
  {
    id: 'block-1',
    type: TRBlockType.TALK,
    userId: TEST_USER_1.id,
    time: 0,
    lang: 'ko-KR',
    text: '동구밖 과수원길 아카시아 꽃이 활짝폈네 동구밖 과수원길 아카시아 꽃이 활짝폈네',
    isActive: true,
    voices: [
      {
        blockId: 'block-1',
        voiceId: 'voice-1',
        ext: 'webm',
        url: 'test-url',
      },
    ] as TRBlockVoice[],
    voiceStart: 0,
    voiceEnd: 0,
  },
  {
    id: 'block-2',
    type: TRBlockType.TALK,
    userId: TEST_USER_1.id,
    time: 0,
    lang: 'ko-KR',
    text: '동구밖 과수원길 ',
    isActive: true,
    voices: [
      {
        blockId: 'block-2',
        voiceId: 'voice-2',
        ext: 'webm',
        url: 'test-url',
      },
    ] as TRBlockVoice[],
    voiceStart: 0,
    voiceEnd: 0,
  },
  {
    id: 'block-3',
    type: TRBlockType.TALK,
    userId: TEST_USER_2.id,
    time: 0,
    lang: 'ko-KR',
    text: '아카시아 꽃이',
    isActive: true,
    voices: [
      {
        blockId: 'block-3',
        voiceId: 'voice-3',
        ext: 'webm',
        url: 'test-url',
      },
    ] as TRBlockVoice[],
    voiceStart: 0,
    voiceEnd: 0,
  },
  {
    id: 'block-4',
    type: TRBlockType.TALK,
    userId: TEST_USER_1.id,
    time: 0,
    lang: 'ko-KR',
    text: '',
    isActive: true,
    voices: [
      {
        blockId: 'block-4',
        voiceId: 'voice-4',
        ext: 'webm',
        url: 'test-url',
      },
    ] as TRBlockVoice[],
    voiceStart: 0,
    voiceEnd: 0,
  },
  {
    id: 'block-5',
    type: TRBlockType.TALK,
    userId: TEST_USER_1.id,
    time: 0,
    lang: 'ko-KR',
    text: 'The first replayable whiteboard for collaboration Traw. \nEnhance a discussion with visuals. Share your meeting by recording it. Use a whiteboard to discuss and work as a team. Play a shared meeting using a link. Voice notes help you be more comfortable navigating a meeting.\nSkip non-urgent meeting 🚀 Increase your productivity After a meeting, it takes more than 23 minutes to get back to work. Hold off on the meeting and work instead.\n\n 🎯 Keep track of your meetings Look over voice notes quickly and playback the essential points. Get meeting details right.\n\n ⌚ Independent of time Do not organize everyones time. Discuss the meeting and share details when its convenient for you. Record and send feedback anytime.\n\n Management system reorganization Trow provides a service to manage documents based on folders. However, as more and more folders were created during work and communication on various topics was made, it was not a convenient way. Therefore, we reorganized our folder-based management system into a channel-based one. You can create public and private channels. You can set member permissions for each channel. Generated documents can move channels. You can view trows, to-dos, and schedules created for each channel separately.',
    isActive: true,
    voices: [
      {
        blockId: 'block-5',
        voiceId: 'voice-5',
        ext: 'webm',
        url: 'test-url',
      },
    ] as TRBlockVoice[],
    voiceStart: 0,
    voiceEnd: 0,
  },
];
