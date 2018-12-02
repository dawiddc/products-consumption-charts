package com.ciokoko.dao;

import com.ciokoko.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ProductDaoImpl implements ProductDao {

    @Override
    public List<Product> getProducts() {
        List<Product> products = new ArrayList<>();
        Iterable<CSVRecord> records;
        try (Reader in = new FileReader(new ClassPathResource("products-consumption.csv").getFile())) {
            records = CSVFormat.EXCEL.withFirstRecordAsHeader().parse(in);
            for (CSVRecord record : records) {
                Map<Integer, Double> valuesPerYear = new HashMap<>();
                for (int i = 2; i < record.size(); i++) {
                    Integer year = 0;
                    for (Map.Entry<String, Integer> entry : ((CSVParser) records).getHeaderMap().entrySet()) {
                        if (entry.getValue() == i) {
                            year = Integer.valueOf(entry.getKey());
                        }
                    }
                    valuesPerYear.put(year, Double.valueOf(record.get(i)));
                }
                final Product product = Product.builder()
                        .name(record.get("product"))
                        .unit(record.get("unit"))
                        .valuesPerYear(valuesPerYear)
                        .build();
                products.add(product);
            }
        } catch (IOException e) {
            log.error("Error reading file!");
        }
        return products;
    }
}