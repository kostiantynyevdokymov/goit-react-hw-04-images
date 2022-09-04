import AppStyled from './App.styled';
import getImage from '../servies/api';
import SearchForm from './Searchbar/SearchForm/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  // state = {
  //   gallery: [],
  //   page: 1,
  //   query: '',
  //   total: null,
  //   loading: false,
  //   imageURL: null,
  //   name: null,
  // };
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      return;
    }
    getImage(query, page).then(data => {
      setGallery(prevState => [...prevState, ...data.hits]);
      setTotal(data.totalHits);
      setLoading(false);
    });
  }, [query, page]);

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     this.state.name !== prevState.name
  //   ) {
  //     this.setState({ loading: true });
  //     getImage(this.state.name, this.state.page)
  //       .then(data =>
  //         this.setState(prevState => {
  //           return { gallery: [...prevState.gallery, ...data.hits] };
  //         })
  //       )
  //       .finally(() => this.setState({ loading: false }));
  //   }
  // }

  const handleSubmit = query => {
    if (query.trim().length === 0) {
      return;
    }
    setGallery([]);
    setQuery(query);
    setPage(1);
    setLoading(true);

    // this.setState({ name: query, page: 1, gallery: [] });

    // if (query.trim().length === 0) {
    //   return;
    // }

    // this.setState({ query, loading: true });

    // getImage(query, this.state.page).then(data =>
    //   this.setState({
    //     gallery: [...data.hits],
    //     total: data.totalHits,
    //   })
    // );
  };
  const handleLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
    // getImage(this.state.query, this.state.page).then(data =>
    //   this.setState(prevState => {
    //     return { gallery: [...prevState.gallery, ...data.hits] };
    //   })
    // );
  };

  const onClickGalleryImage = imageURL => {
    setImageURL(imageURL);
  };

  // const { gallery, imageURL, total } = this.state;
  return (
    <AppStyled>
      <Searchbar>
        <SearchForm onSubmit={handleSubmit} />
      </Searchbar>
      {gallery.length > 0 && (
        <>
          <ImageGallery
            galleryList={gallery}
            onClick={onClickGalleryImage}
            imageURL={imageURL}
          />
          {total !== gallery.length && (
            <Button text="Load more" onClick={handleLoadMoreBtn} />
          )}
        </>
      )}
      {loading && <Loader />}
    </AppStyled>
  );
};
