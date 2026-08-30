export const PROB = 1 / 54;

const cartsData = [
    "El Gallo", "El diablo", "La Sirena", "El pez", "El payaso",
    "El pingüino", "la rana", "El Sombrero", "El Elefante", "El Arpa",
    "El azteca", "La escalera", "El pino", "El barril", "El nopal",
    "El melon", "El alacran", "Los dados", "El borracho", "La Palmera",
    "EL moro", "La canoa", "El corazón", "El paraguas", "El valiente",
    "La jaras", "La pera", "El pájaro", "La Bota", "El Tambor",
    "La garza", "La campana", "El camaron", "El lobo", "EL sol",
    "La estrella", "El jarron", "la Cobra", "La ardilla", "El arbol",
    "la manzana", "La bandera", "La mariposa", "la roza", "El cazo",
    "La calavera", "La sandía", "la corona", "El mundo", "El alce",
    "la maceta", "la mano", "El mono", "La luna"
];

export const carts = cartsData.map((nombre, index) => ({
    id: index + 1,
    nombre,
    probabilidad: PROB
}));
