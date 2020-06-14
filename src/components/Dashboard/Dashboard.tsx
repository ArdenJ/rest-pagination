import React, { useState, useLayoutEffect } from 'react'

import { fetchApps } from './handlers'

export const Dashboard = ({ url, handleRedirect }:{url: string; handleRedirect: any}) => {
  const [apps, setApps] = useState<any>([])
  const token = () => localStorage.getItem('token') || 'error'

  const getApps = async (url: string) => {
    if (token() === 'error') setApps({ error: token })

    const appArr = await Promise.resolve(fetchApps(url, token()))
    if (appArr === 'error') setApps({ error: appArr })
    setApps(appArr?.apps)
  }

  // useLayoutEffect runs after the initial render so we can avoid resolving a promise _during_ render
  useLayoutEffect(() => {
    getApps(url)
  }, [url])

  return (
    <div data-testid='dashboard'>
      <h1>{'hey, ...you'}</h1>
      {
        !apps.error ? apps.length > 0 ? apps.map((i: any, index: number) => <AppItem key={index} name={i.name} picture={i.logo} date={i.date}/>) : 'loading...' : 'error fetching data'
      }
    </div>
  )
}

const AppItem = ({ name, picture, date }:{ name: string, picture: string, date: string }) => {
  return (
    <div data-testid='card'>
      <h3>{name}</h3>
      <span>{date}</span>
      <img height='200' width='200'src={picture} alt={`image of ${name}`}/>
    </div>
  )
}
