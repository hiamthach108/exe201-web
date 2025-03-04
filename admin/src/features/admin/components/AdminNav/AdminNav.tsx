import NavBar from '@/layouts/components/NavBar';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';

const LIST_NAV = [
  {
    name: 'Manage House',
    id: 'manage-house',
  },
  {
    name: 'Manage User',
    id: 'manage-user',
  },
  {
    name: 'Manage Plan',
    id: 'manage-plan',
  },
  {
    name: 'Manage Order',
    id: 'manage-order',
  },
  {
    name: 'Report',
    id: 'report',
  },
];

export default function AdminNav() {
  const location = useLocation();

  return (
    <div className="h-[calc(100dvh)] w-72 sticky top-0 left-0">
      <NavBar>
        <div className="flex-1 py-4">
          <Listbox classNames={{ list: 'gap-4' }}>
            {LIST_NAV.map((item) => (
              <ListboxItem
                classNames={{
                  base: twMerge(
                    'p-0 text-default-500 data-[popover=true]:transition-colors data-[popover=true]:bg-default data-[popover=true]:text-default-foreground ',
                    location.pathname.includes(item.id) ? 'text-default-foreground bg-default' : '',
                  ),
                }}
                hideSelectedIcon={true}
                key={item.id}
                textValue={item.name}
              >
                <Link className="w-full p-3 block" to={`/${item.id}`}>
                  {item.name}
                </Link>
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </NavBar>
    </div>
  );
}
