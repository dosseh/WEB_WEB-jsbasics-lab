import {
  isNumberEven,
  getFileExtension,
  longestString,
  reverseString,
  isPalindrome,
  nestedSum,
  retireDe,
  aplatirRecursif,
  permutations,
  enumerer,
  echantillon,
  nMax,
} from '../src';

describe('JS Basics Tests', () => {
  describe('Test isNumberEven', () => {
    test('42 should be even', () => {
      expect(isNumberEven(42)).toBe(true);
    });

    test('-1 should be odd', () => {
      expect(isNumberEven(-1)).toBe(false);
    });

    test('33 should be odd', () => {
      expect(isNumberEven(33)).toBe(false);
    });

    test('0 should be even', () => {
      expect(isNumberEven(0)).toBe(true);
    });

    const rnd = Math.floor(Math.random() * 1000000) * 2;
    test('random even number should be even', () => {
      expect(isNumberEven(rnd)).toBeTruthy();
    });
  });

  describe('Test getFileExtension', () => {
    test('Should be "png"', () => {
      expect(getFileExtension('image.png')).toEqual('png');
    });

    test('Should be "torrent"', () => {
      expect(getFileExtension('perfectlylegal.torrent')).toEqual('torrent');
    });

    test('Spaces are ok in file names', () => {
      expect(getFileExtension('Spaces are ok in file names.txt')).toEqual(
        'txt'
      );
    });

    test('last extension token only', () => {
      expect(getFileExtension('archive.tar.gz')).toEqual('gz');
    });

    test('Should return false when no extension is found', () => {
      expect(getFileExtension('no extension here')).toBe(false);
    });
  });

  describe('Test longestString', () => {
    test('The longest string is the last one: "abc"', () => {
      expect(longestString(['a', 'ab', 'abc'])).toEqual('abc');
    });

    test("be sure it's a string", () => {
      expect(longestString(['big', [0, 1, 2, 3, 4], 'tiny'])).toEqual('tiny');
    });

    test('utf-8...', () => {
      expect(longestString(['Holà', '\u265E', '你好'])).toEqual('Holà');
    });

    test('various types', () => {
      expect(longestString([true, false, 'lol'])).toEqual('lol');
    });

    test('various types again', () => {
      expect(
        longestString([{ object: true, mainly: 'to confuse you' }, 'x'])
      ).toEqual('x');
    });
  });

  describe('Test reverseString', () => {
    test('Should reverse normal chars in a string', () => {
      expect(reverseString('Hello World!')).toEqual('!dlroW olleH');
    });

    test('Should reverse spaces too', () => {
      expect(reverseString('   abc')).toEqual('cba   ');
    });
  });

  describe('Test isPalindrome', () => {
    test('Should check ascii palindrome with spaces', () => {
      expect(isPalindrome('rats live on no evil star')).toBeTruthy();
    });
    test('Should check ascii palindrome with upper cases', () => {
      expect(isPalindrome('Able was I ere I saw Elba')).toBeTruthy();
    });
    test('Should check utf8', () => {
      expect(isPalindrome('たけやぶやけた')).toBeTruthy();
    });
    test('nope', () => {
      expect(isPalindrome('not this one...')).toBe(false);
    });
  });

  describe('Test nestedSum', () => {
    test('Should work with flat number array', () => {
      expect(nestedSum([1, 2, 3, 4, 5])).toBe(15);
    });

    test('Should work with nested array and other types', () => {
      expect(nestedSum([[1, 2, false], '4', '5'])).toBe(3);
    });

    test('Should work with deeply nested arrays', () => {
      expect(nestedSum([[[[[[[[[1]]]]]]]], 1])).toBe(2);
    });

    test('Should work with deeply nested array + Strings', () => {
      expect(nestedSum([['A', 'B', 'C', 1, 2, 3]])).toBe(6);
    });

    test('Should be careful not to coerce values', () => {
      expect(nestedSum(['1', '2', '3', 1, 2, 3])).toBe(6);
    });

    test('Should return 0 is no number found', () => {
      expect(nestedSum(['nope', false, 'nada', ['rien']])).toBe(0);
    });
  });

  describe('Test retireDe', () => {
    test('Retirer plusieurs elements identiques', () => {
      let myArray = ['a', 'b', 'c', 'a', 'd', 'c', 'z'];
      const expected = ['b', 'd', 'z'];
      retireDe(myArray, 'a', 'c');
      expect(myArray).toEqual(expected);
    });

    test('Retirer tous les éléments', () => {
      let myArray = ['a', 'b', 'c', 'a', 'd', 'c'];
      const expected = [];
      retireDe(myArray, 'a', 'b', 'c', 'd');
      expect(myArray).toEqual(expected);
    });

    test('Doublons à retirer', () => {
      let myArray = ['alpha', 'beta', 'gamma'];
      const expected = ['gamma'];
      retireDe(myArray, 'alpha', 'beta', 'alpha', 'beta');
      expect(myArray).toEqual(expected);
    });

    test('Ne rien retirer', () => {
      let myArray = ['alpha', 'beta', 'gamma'];
      const expected = ['alpha', 'beta', 'gamma'];
      retireDe(myArray, 'nope', 'truc');
      expect(myArray).toEqual(expected);
    });
  });

  describe('Test aplatirRecursif', () => {
    test('aplatir', () => {
      const monTab = [5, [4], [[3], 2], [1], 0];
      const attendu = [5, 4, 3, 2, 1, 0];
      expect(aplatirRecursif(monTab)).toEqual(attendu);
    });
    test('vide', () => {
      expect(aplatirRecursif([])).toEqual([]);
    });
    test('très imbriqué', () => {
      expect(aplatirRecursif([[[[[[[[[1]]]]]]]], 1])).toEqual([1, 1]);
    });
    test('cases vides', () => {
      const monTab = [1, [2], 4];
      monTab[1][5] = 3;
      monTab[4] = 5;
      const attendu = [1, 2];
      attendu[6] = 3;
      attendu[7] = 4;
      attendu[9] = 5;
      expect(aplatirRecursif(monTab)).toEqual(attendu);
    });
  });

  /**
   * Tester la fonction `permutations`.
   *
   * Cette fonction retourne la liste de toutes les permutations des objets du tableau passé en paramètre.
   *
   * Bien penser à tous les cas de figures : tableaux avec 1, 2, ou plusieurs éléments, doublons, etc.
   *
   * Exemple :
   * permutations([0,1,2]);
   * // [ [ 0, 1, 2 ],
   * //   [ 0, 2, 1 ],
   * //   [ 1, 0, 2 ],
   * //   [ 1, 2, 0 ],
   * //   [ 2, 0, 1 ],
   * //   [ 2, 1, 0 ] ]
   *
   */
  describe('Test permutations', () => {
    
    test('permutation nombres', () => {
      const monTab = [0,1,2];
      const attendu =[[ 0, 1, 2 ], [ 0, 2, 1 ] ,[ 1, 0, 2 ],  [ 1, 2, 0 ],[ 2, 0, 1 ], [ 2, 1, 0 ] ];
      expect(permutations(monTab)).toEqual(attendu);
    });

    test('permutation caracteres', () => {
      const monTab = ['a', 'b', 'c'];
      const attendu =[['a', 'b', 'c'],['a', 'c', 'b'], ['b', 'a', 'c'], ['b', 'c', 'a'],['c', 'a', 'b'],['c', 'b', 'a'] ];
      expect(permutations(monTab)).toEqual(attendu);
    });
    test('permutation caracteres et nombres', () => {
      const monTab = ['a', [0, 1, 2], 'c'];
      const attendu =[['a', [0, 1, 2], 'c'],['a', 'c', [0, 1, 2]],[[0, 1, 2], 'a', 'c'],[[0, 1, 2], 'c', 'a'],['c', 'a', [0, 1, 2]],  ['c', [0, 1, 2], 'a']];
      expect(permutations(monTab)).toEqual(attendu);
    });

    test('permutation vide', () => {
      const monTab = [];
      const attendu = [];
      expect(permutations(monTab)).toEqual(attendu);
    });

  });

   
  /**
   * Tester la fonction `echantillon`.
   *
   * Cette fonction retourne un élément au hazard parmi les éléments du tableau `tab` passé en paramètre.
   *
   * Attention : cette fonction utilise un module externe (Math.random) qu'il faut simuler (Mock).
   * Voir la documentation des [fonctions Mock](https://jestjs.io/docs/en/mock-functions.html) de Jest.
   *
   */
  
  describe('Test echantillon', () => {
    const tab = [1, 2, 3, 4, 3, 4, 5, 5, 11, 33];
    Math.random = jest.fn();
    Math.random.mockReturnValueOnce(0)
      .mockReturnValueOnce(1 / tab.length)
      .mockReturnValueOnce(2 / tab.length)
      .mockReturnValueOnce(3 / tab.length);

    test('Mock random 1', () => {
      const attendu = 1;
      expect(echantillon(tab)).toEqual(attendu);
    });
    test('Mock random 2', () => {
      const attendu = 2;
      expect(echantillon(tab)).toEqual(attendu);
    });
    test('Mock random 3', () => {
      const attendu = 3;
      expect(echantillon(tab)).toEqual(attendu);
    });

  });
  /**
   * Tester la fonction `enumerer`.
   *
   * Cette fonction prend un tableau 'tab' et le transforme en string avec chaque élément séparé par le `separateur`.
   * Les deux derniers éléments sont séparé pas le séparateur `fin`.
   *
   * Exemple:
   * enumerer(['Riri', 'Fifi', 'Loulou'], ", ", " et ");
   * // 'Riri, Fifi et Loulou'
   *
   * Attention aux cas particuliers (tableaux à 0, 1 ou 2 éléments.)
   */
  describe('Test enumerer', () => {

    test('plusque 3 élements', () => {
      const monTab = ['Riri', 'Fifi', 'tata', 'Loulou'];
      const attendu ='Riri, Fifi, tata et Loulou';
      expect(enumerer(monTab,", " , "et ")).toEqual(attendu);
    });

    test('Avec 2 élements', () => {
      const monTab = ['Riri', 'Fifi'];
      const attendu ='Riri et Fifi';
      expect(enumerer(monTab,", " , "et ")).toEqual(attendu);
    });
    test('Avec 1 élements', () => {
      const monTab = ['Riri'];
      const attendu ='Riri';
      expect(enumerer(monTab,", " , "et ")).toEqual(attendu);
    });

    test('Avec 0 élements', () => {
      const monTab = [];
      const attendu ='';
      expect(enumerer(monTab,", " , "et ")).toEqual(attendu);
    });
  });

  /**
   * Tester la fonction `nMax`.
   *
   * Cette fonction retourne, sous forme d'un tableau, les `n` plus grand nombres du tableau `tab` passé en paramètre.
   *
   * Attention, on ne doit pas modifier le tableau d'origine.
   *
   * Exemples:
   * nMax([1, 2, 3]); // [3]
   * nMax([1, 2, 3], 2); // [3,2]
   * nMax([1, 2, 3], 20); // [1,3,2]
   * nMax(['1', '2', 3], 2); // [3]
   * nMax(['1', '2', '3'], 2); // []
   *
   */

  describe('Test nMax', () => {
    test('Sans parametre n', () => {
      const monTab = [1, 2, 3];
      const attendu = [3];
      expect(nMax(monTab)).toEqual(attendu);
    });
  
    test('Avec n = 2', () => {
      const n = 2;
      const monTab = [1, 2, 3];
      const attendu = [2, 3];
      expect(nMax(monTab, n)).toEqual(attendu);
    });
  
    test('Avec n superieur monTab.length', () => {
      const n = 20;
      const monTab = [1, 2, 3];
      const attendu = [1, 2, 3];
      expect(nMax(monTab, n)).toEqual(attendu);
    });
  
    test('Avec et sans caracteres', () => {
      const n = 2;
      const monTab = ['1', '2', 3];
      const attendu = [3];
      expect(nMax(monTab, n)).toEqual(attendu);
    });
  
    test('Avec Rien que des caracteres', () => {
      const n = 2;
      const monTab = ['1', '2', '3'];
      const attendu = [];
      expect(nMax(monTab, n)).toEqual(attendu);
    });
  });
  

});
