// 필터에 사용할 상수들 (모바일 필터에서도 사용할 수 있도록 export함.)
export const grade = {
  value: "grade",
  label: "등급",
  options: [
    { label: "COMMON", value: "COMMON", color: "main" },
    { label: "RARE", value: "RARE", color: "blue" },
    { label: "SUPER RARE", value: "SUPER_RARE", color: "purple" },
    { label: "LEGENDARY", value: "LEGENDARY", color: "pink" },
  ],
  placeholder: "등급",
};
export const genre = {
  value: "genre",
  label: "장르",
  options: [
    { label: "앨범", value: "ALBUM" },
    { label: "특전", value: "SPECIAL" },
    { label: "팬싸", value: "FAN_SIGN" },
    { label: "시즌그리팅", value: "SEASONS_GREETINGS" },
    { label: "팬미팅", value: "FAN_MEETING" },
    { label: "콘서트", value: "CONCERT" },
    { label: "MD", value: "MD" },
    { label: "콜라보", value: "COLLAB" },
    { label: "팬클럽", value: "FAN_CLUB" },
    { label: "기타", value: "OTHERS" },
  ],
  placeholder: "장르",
};
export const excludeSoldOut = {
  value: "excludeSoldOut",
  label: "품절 여부",
  defaultValue: "include",
  options: [
    { label: "품절 포함", value: "include" },
    { label: "품절 제외", value: "exclude" },
  ],
  placeholder: "매진여부",
};

// 정렬에 사용할 상수
export const sort = {
  defaultValue: "latest",
  options: [
    { label: "최신순", value: "latest" },
    { label: "오래된 순", value: "oldest" },
    { label: "낮은 가격 순", value: "priceAsc" },
    { label: "높은 가격 순", value: "priceDesc" },
  ],
};
