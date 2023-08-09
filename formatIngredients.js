// Correctly formatting the ingredients section
export function formatIngredients(ingredients) {
    const ingredientCount = ingredients.length
    let formattedIngredients = ''

    ingredients.forEach((ingredient, index) => {
        if (index === ingredientCount - 2) {
            formattedIngredients += ingredient + ' and '
        } else if (index === ingredientCount - 1) {
            formattedIngredients += ingredient + '.'
        } else {
            formattedIngredients += ingredient + ', '
        }
    })

    return formattedIngredients
}