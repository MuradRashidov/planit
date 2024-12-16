'use client'

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-modal";
import { ProModal } from "../modals/pro-modal";

interface ModalProviderProps {
  
};

export const ModalProvider = ({}: ModalProviderProps) => {
    const [isMounted,setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true);
    },[])
    if(!isMounted) return;
  return (
    <>
        <CardModal/>
        <ProModal/>
    </>
  )
};