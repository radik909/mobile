import { useQuery } from '@tanstack/react-query';
import { makeApiCall } from '.';

type MenuReqType = {
  lat?: number;
  lng?: number;
  country?: string;
};

const url = {
  menu: ({ lat, lng, country }: MenuReqType) => ({
    method: 'GET',
    url: 'menu_items',
    params: lat && lng ? { lat, lng } : { country },
  }),
};

export type MenuItemType = {
  height: number;
  imageUrl: string;
  product: { id: number; name: string };
  width: number;
};

export const useGetMenuItems = (params: MenuReqType) =>
  useQuery<MenuItemType[]>({
    queryKey: ['menu', params],
    queryFn: () => makeApiCall<MenuItemType[]>(url.menu(params)),
  });
