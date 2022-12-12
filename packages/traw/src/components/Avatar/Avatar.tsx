import React from 'react';

interface UserAvatarProps {
  avatarUrl?: string | undefined;
  userName: string;
}
const RE_KOREAN = /[ㄱ-ㅎ|ㅏ-ㅣㅣ가-힣]/;

export const UserAvatar = ({ avatarUrl, userName }: UserAvatarProps) => {
  const isKorean = RE_KOREAN.test(userName.substring(0, 2));
  const shortName = userName.substring(0, isKorean ? 1 : 2).toUpperCase();

  if (!avatarUrl) {
    return (
      <div className="flex rounded-full h-6 w-6 bg-traw-grey-100  text-white text-xs items-center justify-center">
        {shortName}
      </div>
    );
  }
  return <img className="flex rounded-full h-6 w-6 items-center justify-center" src={avatarUrl} alt={userName} />;
};
