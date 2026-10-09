package com.mansy.erdiagram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class ErdiagramApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErdiagramApplication.class, args);
	}

}
