// icons
import {
  HomeIcon as HomeIconLine,
  MagnifyingGlassCircleIcon as SearchIconLine,
  PlusCircleIcon as PlusCircleIconLine,
  HeartIcon as HeartIconLine,
  UserIcon as UserIconLine,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconFill,
  MagnifyingGlassCircleIcon as SearchIconFill,
  PlusCircleIcon as PlusCircleIconFill,
  HeartIcon as HeartIconFill,
  UserIcon as UserIconFill,
} from "@heroicons/react/24/solid";

// path interfaces
export interface IHeaderPath {
  label: string;
  href: string;
  prev: boolean;
}

export interface ITabPath {
  label: string;
  href: string;
  icon: {
    active: JSX.Element;
    inactive: JSX.Element;
  };
}

// all paths arr
export const basePathItems: IHeaderPath[] = [
  {
    label: "홈",
    href: "/",
    prev: false,
  },
  {
    label: "게시글",
    href: "/tweets/:id",
    prev: true,
  },
  {
    label: "추가",
    href: "/tweets/add",
    prev: true,
  },
  {
    label: "검색",
    href: "/search",
    prev: false,
  },
  {
    label: "내가 좋아한 트윗",
    href: "/likes",
    prev: false,
  },
  {
    label: "프로필",
    href: "/users/:id",
    prev: false,
  },
  {
    label: "프로필 수정",
    href: "/users/:id/edit",
    prev: true,
  },
];

// baseTab path arr
export const baseTabItems: ITabPath[] = [
  {
    label: "트윗",
    href: "/",
    icon: {
      active: <HomeIconFill className="size-12 text-slate-700" />,
      inactive: <HomeIconLine className="size-12" />,
    },
  },
  {
    label: "검색",
    href: "/search",
    icon: {
      active: <SearchIconFill className="size-12 text-slate-700" />,
      inactive: <SearchIconLine className="size-12" />,
    },
  },
  {
    label: "추가",
    href: "/tweets/add",
    icon: {
      active: <PlusCircleIconFill className="size-12 text-slate-700" />,
      inactive: <PlusCircleIconLine className="size-12" />,
    },
  },
  {
    label: "좋아요",
    href: "/likes",
    icon: {
      active: <HeartIconFill className="size-12 text-slate-700" />,
      inactive: <HeartIconLine className="size-12" />,
    },
  },
  {
    label: "프로필",
    href: "/users/:id",
    icon: {
      active: <UserIconFill className="size-12 text-slate-700" />,
      inactive: <UserIconLine className="size-12" />,
    },
  },
];
