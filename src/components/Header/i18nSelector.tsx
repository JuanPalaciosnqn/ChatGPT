import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { setRequestHeader } from '@api/request';
import { track } from '@utils/track';
const langs = [
  {
    id: 1,
    name: 'English',
  },
  {
    id: 2,
    name: '简体中文',
  },
];

function classNames(classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const I18NSelector = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(
    i18n.language === 'en' ? 'English' : '简体中文'
  );
  useEffect(() => {
    if (selected) {
      setRequestHeader(
        'x-lang',
        selected === 'English' ? 'english' : 'chinese'
      );
      i18n.changeLanguage(selected === 'English' ? 'en' : 'zh-CN');
      track('change_language', {
        value: selected === 'English' ? 'en' : 'zh-CN',
      });
    }
  }, [selected]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className='relative'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-bg-100 py-1.5 pl-3 pr-3 text-left text-white sm:text-sm sm:leading-6 md:pr-10'>
              <span className='flex items-center'>
                <span>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.4883 9.41667H12.33C12.27 12.4083 11.58 14.9842 10.5858 16.3325C12.1909 15.9845 13.6375 15.1195 14.7037 13.8703C15.7699 12.621 16.3969 11.0565 16.4883 9.41667ZM16.4883 8.58333C16.3969 6.9435 15.7699 5.37896 14.7037 4.12971C13.6375 2.88046 12.1909 2.0155 10.5858 1.6675C11.5808 3.01583 12.27 5.5925 12.3292 8.58333H16.4883ZM1.51167 8.58333H5.67C5.73 5.59167 6.42 3.01583 7.41417 1.6675C5.80908 2.0155 4.36247 2.88046 3.29627 4.12971C2.23006 5.37896 1.60314 6.9435 1.51167 8.58333ZM1.51167 9.41667C1.60314 11.0565 2.23006 12.621 3.29627 13.8703C4.36247 15.1195 5.80908 15.9845 7.41417 16.3325C6.41917 14.9842 5.73 12.4075 5.67083 9.41667H1.51167ZM6.505 9.41667C6.58833 13.3983 7.8675 16.3325 9 16.3325C10.1333 16.3325 11.4117 13.3983 11.4958 9.41667H6.505ZM11.495 8.58333C11.4125 4.60167 10.1333 1.5 9 1.5C7.86667 1.5 6.58833 4.60167 6.50417 8.58333H11.4958H11.495ZM9 17.3333C4.3975 17.3333 0.666667 13.6025 0.666667 9C0.666667 4.3975 4.3975 0.666667 9 0.666667C13.6025 0.666667 17.3333 4.3975 17.3333 9C17.3333 13.6025 13.6025 17.3333 9 17.3333Z'
                      fill='white'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M11.495 8.58333C11.4938 8.5276 11.4925 8.47205 11.4908 8.41667C11.3767 4.51545 10.1175 1.5 9 1.5C7.88253 1.5 6.62409 4.51545 6.5084 8.41667C6.50676 8.47205 6.50534 8.5276 6.50417 8.58333H11.495ZM6.67514 8.41667H11.3241C11.2679 6.51074 10.9362 4.82319 10.4853 3.60645C10.2529 2.97923 9.99158 2.4848 9.7259 2.15056C9.45567 1.8106 9.20609 1.66667 9 1.66667C8.79391 1.66667 8.54439 1.81059 8.27422 2.15054C8.00858 2.48479 7.74736 2.97922 7.51493 3.60645C7.06405 4.82319 6.73214 6.51074 6.67514 8.41667ZM12.33 9.41667H16.4883C16.4852 9.47231 16.4815 9.52787 16.4772 9.58333C16.3538 11.1623 15.7338 12.6634 14.7037 13.8703C13.6919 15.0558 12.3376 15.8952 10.8303 16.2752C10.7492 16.2956 10.6677 16.3147 10.5858 16.3325C10.6338 16.2675 10.681 16.1996 10.7275 16.1289C11.6451 14.7347 12.2729 12.2641 12.33 9.41667ZM10.9639 16.0674C12.3677 15.6765 13.6268 14.8754 14.577 13.7621C15.5813 12.5853 16.187 11.1225 16.31 9.58333H12.4927C12.4179 12.2766 11.8351 14.6418 10.9639 16.0674ZM16.31 8.41667C16.187 6.87751 15.5813 5.41465 14.577 4.23791C13.6268 3.12468 12.3678 2.32353 10.9641 1.93269C11.8359 3.35839 12.4178 5.72423 12.4919 8.41667H16.31ZM16.4772 8.41667C16.4815 8.47213 16.4852 8.52769 16.4883 8.58333H12.3292C12.2729 5.73676 11.6458 3.26536 10.7276 1.87108C10.6811 1.80043 10.6338 1.73254 10.5858 1.6675C10.6678 1.68526 10.7493 1.70438 10.8304 1.72482C12.3376 2.1048 13.692 2.94423 14.7037 4.12971C15.7338 5.33657 16.3538 6.83768 16.4772 8.41667ZM5.50727 8.41667C5.58212 5.72342 6.16486 3.35819 7.03614 1.93264C5.63232 2.32346 4.3732 3.12462 3.42304 4.23791C2.41872 5.41465 1.81302 6.87751 1.69001 8.41667H5.50727ZM1.52282 8.41667C1.51849 8.47213 1.51477 8.52769 1.51167 8.58333H5.67C5.72711 5.73595 6.35491 3.26525 7.27249 1.87105C7.31898 1.80041 7.36622 1.73253 7.41417 1.6675C7.33227 1.68526 7.25078 1.70436 7.16974 1.72479C5.66244 2.10477 4.30807 2.9442 3.29627 4.12971C2.26624 5.33657 1.64619 6.83768 1.52282 8.41667ZM1.69001 9.58333C1.81302 11.1225 2.41872 12.5853 3.42304 13.7621C4.37316 14.8753 5.63221 15.6765 7.03595 16.0673C6.16414 14.6416 5.58217 12.2758 5.50806 9.58333H1.69001ZM1.52282 9.58333C1.64619 11.1623 2.26624 12.6634 3.29627 13.8703C4.30805 15.0558 5.66238 15.8952 7.16964 16.2752C7.25071 16.2956 7.33224 16.3147 7.41417 16.3325C7.36617 16.2675 7.3189 16.1996 7.27237 16.1289C6.35416 14.7346 5.72715 12.2632 5.67083 9.41667H1.51167C1.51477 9.47231 1.51849 9.52787 1.52282 9.58333ZM6.505 9.41667C6.50617 9.4724 6.50757 9.52795 6.5092 9.58333C6.62411 13.4846 7.88335 16.5 9 16.5C10.1175 16.5 11.3759 13.4846 11.4916 9.58333C11.4929 9.54046 11.494 9.49748 11.495 9.45439C11.4953 9.44182 11.4956 9.42925 11.4958 9.41667H6.505ZM11.3249 9.58333H6.67594C6.73256 11.4893 7.06447 13.1768 7.51534 14.3935C7.74777 15.0208 8.009 15.5152 8.27459 15.8495C8.54474 16.1895 8.79416 16.3333 9 16.3333C9.20609 16.3333 9.45561 16.1894 9.72578 15.8495C9.99142 15.5152 10.2526 15.0208 10.4851 14.3935C10.9359 13.1768 11.2679 11.4893 11.3249 9.58333ZM9 17.5C4.30545 17.5 0.5 13.6945 0.5 9C0.5 4.30545 4.30545 0.5 9 0.5C13.6945 0.5 17.5 4.30545 17.5 9C17.5 13.6945 13.6945 17.5 9 17.5ZM0.666667 9C0.666667 13.6025 4.3975 17.3333 9 17.3333C13.6025 17.3333 17.3333 13.6025 17.3333 9C17.3333 4.3975 13.6025 0.666667 9 0.666667C4.3975 0.666667 0.666667 4.3975 0.666667 9Z'
                      fill='white'
                    />
                  </svg>
                </span>
                <span className='ml-3 hidden truncate md:block'>
                  {selected}
                </span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3  hidden items-center pr-2 md:flex'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-fit overflow-auto rounded-md bg-gray-850 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:w-full'>
                {langs.map((lang) => (
                  <Listbox.Option
                    key={lang.id}
                    className={({ active }) =>
                      classNames([
                        active ? 'bg-indigo-600 text-white' : 'text-white',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      ])
                    }
                    value={lang.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames([
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            ])}
                          >
                            {lang.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames([
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ])}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
