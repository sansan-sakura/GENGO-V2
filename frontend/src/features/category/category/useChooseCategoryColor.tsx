import { chooseColors } from '../../../utils/helpers'
import { useCategory } from './useCategory'

export const useChooseCategoryColor = (category: string) => {
  const { isPending, categories, error } = useCategory()
  if (isPending || error || !categories.length || !category) return null

  const categoryBgColors = chooseColors(categories)
  const categoryColor = categoryBgColors.find(
    (item) => item.category.category === category,
  )

  return categoryColor
}
