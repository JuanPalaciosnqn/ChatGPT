
import useStore from "@store/store"
import { searchFuncions } from "./variable"
import { useEffect, useImperativeHandle, useRef, useState } from "react"
import { LoadingBlock } from "@components/LoadingBlock"
import React from "react";
import { useTranslation } from "react-i18next";

export const SimpleLoading = React.forwardRef((props: any, ref: any) => {
  const {t} = useTranslation()
  const [width, setWidth] = useState('1%')
  const timeoutIds = useRef<any>([]); // 使用 useRef 来存储 timeout IDs
  const response = useStore((state) => state.response)
  const getStatusByKey = useStore((state) => state.getStatusByKey)
  const [hide, setHide] = useState(false);

  const leastOneDone = searchFuncions.some((item: any) => {
    const event = getStatusByKey(item.name)
    return event !== 'loading'
  }) && Object.values(response).some((item: any) => item !== '');

  const noAnswer = searchFuncions.every((item: any) => {
    return getStatusByKey(item.name) === 'unUseful' || (getStatusByKey(item.name) === 'done' && response[item.name] === '')
  })
  useImperativeHandle(ref, () => ({
    restart: () => {
      console.log('restart')
      setHide(false)
      setWidth('1%')
    },
    hide: () => {
      setHide(true)
      setWidth('1%')
    }
  }));

  useEffect(() => {
    if(!leastOneDone){
      timeoutIds.current.push(setTimeout(() => {
        setWidth('10%')
      }, 1000))
  
      timeoutIds.current.push(setTimeout(() => {
        setWidth('30%')
      }, 5000))
  
      timeoutIds.current.push(setTimeout(() => {
        setWidth('60%')
      }, 7000))
  
      timeoutIds.current.push(setTimeout(() => {
        setWidth('90%')
      }, 13000))
    }else{
      timeoutIds.current.forEach((id: any) => clearTimeout(id));
      setWidth('100%')
      setTimeout(() => {
        setHide(true)
      }, 500)
    }
  }, [leastOneDone])

  useEffect(() => {
    if(noAnswer){
      timeoutIds.current.forEach((id: any) => clearTimeout(id));
      setWidth('100%')
      setTimeout(() => {
        setHide(true)
      }, 500)
    }
  }, [noAnswer])
 
  if(noAnswer){
    return (
      <div className="p-4 bg-bg-50 border border-bg-200 rounded-none md:rounded-xl mt-6 text-white">
        {t('noAnswer')}
      </div>
    )
  }
  return (
    <div className={`w-full h-2 bg-bg-200 rounded-full mt-8 mb-4 relative transition-all ${hide ? 'hidden' : ''}`}>
      <div className="animate-pulse absolute h-2 rounded-full left-0 top-0 transition-all" style={{width: width, backgroundColor: '#7074E9'}}></div>
    </div>
  )

})