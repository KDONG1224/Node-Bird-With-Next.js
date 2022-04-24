import React, { useEffect } from 'react';
// next에서는 안써도 됌
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      // console.log(
      //   window.scrollY,
      //   document.documentElement.clientHeight,
      //   document.documentElement.scrollHeight,
      // );
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

// 안티패턴
// 피해야 되는것, 인덱스를 키로 사용하면 안됌.
// 반복되는것들이 지워질 가능성이 있는것, 순서가 달라지거나, 중간에 뭐가 추가될때 인덱스를 키로 사용하면 안됌.
// 다만, 바뀌지 않으면 인덱스를 키로 사용가능.
