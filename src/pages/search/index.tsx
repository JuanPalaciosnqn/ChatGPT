import React, { useState } from "react"
import TextColorLogo from '@logo/textColor'
import TextColorLogoDark from '@logo/textColorDark'
import useStore from '@store/store';
import SearchInput from "@components/Search/searchInput";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { TransparentHeader } from "@components/Header/transparent";
import QNALogo from "@logo/qnaLogo";

const hotQuestion = [
  'What Layer 2 projects received investment in 2023?',
  'What is LSDfi and what value does it provide to users?',
  'How to analyze the long-term investment potential of a blockchain project?',
  'What will change after EIP-4844?',
  'What are the four types of zkEVM?',
  'What projects have the top crypto funds invested in over the past month?',
  'What are the differences between modular blockchain and monolithic blockchain? List the current players',
  'I own a GameFi company with an expected 500 users. Which layer2 should I choose?',
  'What are some recommended coins and reasons for investing with 1000 USD?',
  'Compare with ERC20、721、1155 and 3525'
]

const SearchPage = () => {
  const [searchText, setSearchText] = useState('')
  const theme = useStore((state) => state.theme);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/search/' + encodeURIComponent(searchText))
  }
  return (
    <div className="w-full flex flex-col min-h-full bg-gradient-to-t from-gray-100 to-gray-100/10">
      <div>
        <TransparentHeader />
      </div>
      <div
        className={`flex h-full flex-1 px-4 flex-col w-full  md:mt-0 m-auto max-w-3xl md:max-w-3xl lg:max-w-3xl xl:max-w-5xl`}
      >
          <div className="w-full flex justify-center align-middle mb-6">
            <QNALogo className="w-20 h-20 md:w-40 md:h-40"/>
          </div>
          <SearchInput 
            value={searchText}
            setValue={setSearchText}
            handleSubmit={handleSubmit}
          />
          <div className="mt-4">
            <div className="text-sm text-gray-500 mb-2">
              {t('hotQuestion')}
            </div>
              {hotQuestion.map((item, index) => {
                return (
                  <Link key={item} to={`/search/${encodeURIComponent(item)}`}>
                    <div className="flex items-center justify-start gap-4 py-2 md:py-2 px-2 md:px-4 mb-2 rounded-md border border-violet-400 hover:bg-violet-800 hover:text-white bg-violet-200/10 text-gray-600 text-xs md:text-sm">
                      <div className="w-2 h-2 bg-violet-700 parent-sibling-hover:bg-white rounded-full"></div>
                      <div className="flex-1">
                        {item}
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
          <div className="mt-4">
              
          </div>
      </div>
    </div>
  )
}

export default SearchPage