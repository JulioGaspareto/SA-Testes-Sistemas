const fruits = [
    { id: 1, nome: 'Morango' },
    { id: 2, nome: 'Abacate' }
]


class FruitService {
    getAll() {
        return fruits
    }

    getById(id) {
        const data = db.select("x, y, z")
        return data.find((fruit) => fruit.id === parseInt(id))
    }
}

export const fruitService = new FruitService()