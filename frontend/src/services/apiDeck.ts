import { useAuth } from '@clerk/clerk-react'
import {
  DECK_CREATE_URL,
  ALL_DECK_URL,
  DECK_BY_ID_URL,
  DECK_WITH_CATEGOY_URL,
  DECK_WITH_DATE_CATEGOY_URL,
  ALL_DECK_DATES_URL,
} from '../statics/fetchUrls'
import fetch from 'isomorphic-fetch'
import { NewDeckType } from '../types/flashcardTypes'

export async function getDatesOfDecks(categoryId: string, query: string) {
  const { getToken } = useAuth()
  console.log('getting')
  try {
    const res = await fetch(
      categoryId === 'all'
        ? ALL_DECK_DATES_URL(query)
        : DECK_WITH_DATE_CATEGOY_URL(categoryId, query),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await res.json()
    console.log(data)
    if (data.status === 'fail' || data.status === 'error') {
      alert(data.message)
      throw new Error(data.message)
    }
    return data
  } catch (err: any) {
    throw new Error("Couldn't get dates")
  }
}
