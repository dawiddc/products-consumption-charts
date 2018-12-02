package com.ciokoko.dao;

import com.ciokoko.endpoints.ProductEndpoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class ProductInjector {

    @Bean
    public ProductDao productDao() {
        return new ProductDaoImpl();
    }

    @Bean
    @Lazy
    public ProductEndpoint productEndpoint(ProductDao productDao) {
        return new ProductEndpoint(productDao);
    }
}
