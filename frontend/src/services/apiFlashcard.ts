import { FLASHCARD_CREATE_URL, FLASHCARD_BY_ID_URL } from '../statics/fetchUrls'
import { CardType, CreateFlashCard } from '../types/flashcardTypes'
import { findToken } from '../utils/apiHelpers'

export async function createFlashCard(body: CreateFlashCard, token: any) {
  if (!token) return alert('Please check in first')
  try {
    const res = await fetch(FLASHCARD_CREATE_URL, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.status === 'fail' || data.status === 'error') {
      alert(data.message)
      throw new Error(data.message)
    }
    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function deleteFlashCard(id: number | string | undefined, token: any) {
  if (id === undefined) return
  if (!token) return alert('Please check in first')
  try {
    const res = await fetch(FLASHCARD_BY_ID_URL(id), {
      method: 'DELETE',
      headers: { Authorization: token },
    })
    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message)
    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function updateFlashCard(
  id: string | undefined,
  body: CardType | { status: string },
  token: any,
) {
  if (id === undefined) return
  if (!token) return alert('Please check in first')
  try {
    const res = await fetch(FLASHCARD_BY_ID_URL(id), {
      method: 'PUT',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message)

    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}
