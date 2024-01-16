import React, { useState, useEffect } from 'react';
import Image from './Image';

const Feed = () => {
  
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  // Função para obter as imagens
  const fetchImages = async () => {

    try {
    
        setIsLoading(true);

        const response = await fetch('https://source.unsplash.com/random');
        const imageUrl = await response.url;

        setImages(prevImages => [...prevImages, { url: imageUrl }]);
        setIsLoading(false);
    
    } catch (error) {
        console.error("Erro ao carregar as imagens", error);
        setIsLoading(false);
    }
  };

// Efeito para carregar mais imagens quando o usuário rolar até o final da página
  useEffect(() => {
    
    // Carregando as imagens iniciais
    fetchImages();
    
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
        !isLoading &&
        !reachedEnd
      ) {
        // Evita chamar a função novamente se já atingiu o final
        setReachedEnd(true);
        fetchImages();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, reachedEnd]);

   
  // Efeito para redefinir o estado reachedEnd quando novas imagens são carregadas
   useEffect(() => {
    if (isLoading) {
      setReachedEnd(false);
    }
  }, [isLoading]);

  return (
    <div>
      <h1>Feed</h1>
      {images.map((image, index) => (
        <Image key={index} src={image.url} />
      ))}
      {isLoading && <p>Carregando...</p>}
    </div>
  );
};

export default Feed;
