import { Zoo, Animal } from './zoo';

describe('Zoo', () => {
  let zoo: Zoo;

  beforeEach(() => {
    zoo = new Zoo();
  });

  test('should add a new animal', () => {
    const animal = new Animal('Leo', 'Lion', 5);
    zoo.addAnimal(animal);
    expect(zoo.getAllAnimals()).toContainEqual(animal);
  });

  test('deve remover um animal existente', () => {
    const animal = new Animal('Leo', 'Lion', 5);
    zoo.addAnimal(animal);
    zoo.removeAnimal('Leo');
    expect(zoo.getAnimal('Leo')).toBeUndefined();
  });

  test('deve obter um animal existente pelo nome', () => {
    const animal = new Animal('Leo', 'Lion', 5);
    zoo.addAnimal(animal);
    const retrievedAnimal = zoo.getAnimal('Leo');
    expect(retrievedAnimal).toEqual(animal);
  });

  test('deve retornar undefined ao tentar obter um animal não existente pelo nome', () => {
    const animal = new Animal('Leo', 'Lion', 5);
    zoo.addAnimal(animal);
    const retrievedAnimal = zoo.getAnimal('Max'); // Assumindo que 'Max' não está no zoológico
    expect(retrievedAnimal).toBeUndefined();
  });

  test('deve retornar todos os animais', () => {
    const animals = [
      new Animal('Leo', 'Lion', 5),
      new Animal('Ben', 'Bear', 3),
      new Animal('Max', 'Monkey', 4)
    ];
    animals.forEach(animal => zoo.addAnimal(animal));
    const allAnimals = zoo.getAllAnimals();
    expect(allAnimals).toEqual(expect.arrayContaining(animals));
    expect(allAnimals.length).toBe(3); // Assumindo que três animais foram adicionados
  });

  test('deve retornar animais de uma espécie específica', () => {
    const lion = new Animal('Leo', 'Lion', 5);
    const bear = new Animal('Ben', 'Bear', 3);
    const monkey = new Animal('Max', 'Monkey', 4);
    zoo.addAnimal(lion);
    zoo.addAnimal(bear);
    zoo.addAnimal(monkey);
    const animalsBySpecies = zoo.getAnimalsBySpecies('Lion');
    expect(animalsBySpecies).toContainEqual(lion);
    expect(animalsBySpecies).not.toContainEqual(bear);
    expect(animalsBySpecies).not.toContainEqual(monkey);
  });

  test('deve calcular a idade média dos animais', () => {
    const lion = new Animal('Leo', 'Lion', 5);
    const bear = new Animal('Ben', 'Bear', 3);
    zoo.addAnimal(lion);
    zoo.addAnimal(bear);
    const averageAge = zoo.getAverageAge();
    expect(averageAge).toBeCloseTo((5 + 3) / 2, 5); // Usando uma precisão de 5 casas decimais
  });

  test('deve retornar 0 para a idade média quando não há animais presentes', () => {
    const averageAge = zoo.getAverageAge();
    expect(averageAge).toBe(0);
  });

});
