import { PostsService } from './posts.service';
import { Post } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const resultFindMany = postsService.findMany();
      expect(resultFindMany.map((post) => post.text)).toEqual(posts.map((post) => post.text));
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
    const twoPost = postsService.findMany({ skip: 1, limit: 2 });
    expect(twoPost.length).toBe(2);
  
    expect(postsService.findMany({skip : 0, limit : 0})).toHaveLength(0);
    expect(postsService.findMany({limit : 0})).toHaveLength(0);
    expect(postsService.findMany({skip : 0})).toEqual(posts.map((post) => post.text));
    expect(postsService.findMany({limit : 100})).toEqual(posts.map((post) => post.text));
    expect(postsService.findMany({skip : 100})).toHaveLength(0);

    });
  });
    // реализуйте недостающие тест-кейсы


  describe('.find', () => {
    let post1: Post;
    let post2: Post;

    beforeEach(() => {
      post1 = postsService.create({ text: 'Первый принял' });
      post2 = postsService.create({ text: 'Второй сдал' });
    });

    it('should find existing post by id', () => {
      const found = postsService.find(post1.id);
      expect(found).toEqual(post1);
    });

    it('should return undefined for non-existing id', () => {
      const found = postsService.find('999');
      expect(found).toBeUndefined();
    });
  });

  describe('.delete', () => {
    let postIdHero: string;
    let ourHeroId: string;

    beforeEach(() => {
      const post = postsService.create({ text: 'Our Hero' });
      postIdHero = post.id;
      const post2 = postsService.create({ text: 'Наш Герой Жив !' });
      ourHeroId = post2.id;
    });

    it('should remove the post with given id from the list', () => {
      postsService.delete(postIdHero);

      expect(postsService.findMany().find(post => post.id === ourHeroId));
      expect(postsService.findMany().find(post => post.id !== postIdHero));
    });

    it('should do nothing if post does not exist (no error, just filtered out)', () => {
      postsService.delete('999'); // не выбрасывает ошибку
      expect(postsService.findMany().length).toBe(2); // оба поста остались
    });
  });

  describe('.update', () => {
    let post: Post;

    beforeEach(() => {
      post = postsService.create({ text: 'Hellow' });
    });

    it('should update text of existing post', () => {
      const newText = 'Hellow World!';
      postsService.update(post.id, { text: newText });

      const updated = postsService.find(post.id);
      expect(updated?.text).toBe(newText);
    });

    it('should throw Error when updating non-existing post', () => {
      expect(() => {
        postsService.update('999', { text: 'Oy oy' });
      }).toThrow('Пост не найден');
    });
  });
});