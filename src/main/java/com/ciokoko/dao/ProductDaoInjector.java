package com.ciokoko.dao;

import com.ciokoko.endpoints.ProductEndpoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductDaoInjector {

    @Bean
    public ProductDao productDao() {
        return new ProductDaoImpl();
    }

    @Bean
    public ProductEndpoint productEndpoint(ProductDao productDao) {
        return new ProductEndpoint(productDao);
    }
}
