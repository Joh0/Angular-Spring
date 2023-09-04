package com.sample.SpringBootAngular.security;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig{
	
//  Replaces the credentials in Spring Security
	@Bean
	public UserDetailsManager userDetailsManager(DataSource dataSource) {
		return new JdbcUserDetailsManager(dataSource);
	}
	
// For testing your APIs without having to put credentials, use the below which allows any Http Requests
	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http.authorizeHttpRequests(auth -> 
//			auth.anyRequest().authenticated());
//		http.httpBasic().authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint());
//		http.csrf(csrf -> csrf.disable());
//		return http.build();
//	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.authorizeHttpRequests(configurer -> 
			configurer
				.requestMatchers(HttpMethod.GET, "/api/login").hasRole("EMPLOYEE")
				.requestMatchers(HttpMethod.GET, "/api/furnitures").hasRole("EMPLOYEE")
				.requestMatchers(HttpMethod.GET, "/api/furnitures/**").hasRole("EMPLOYEE")
				.requestMatchers(HttpMethod.POST, "/api/furnitures").hasRole("MANAGER")
				.requestMatchers(HttpMethod.PUT, "/api/furnitures").hasRole("MANAGER")
				.requestMatchers(HttpMethod.DELETE, "/api/furnitures/**").hasRole("ADMIN")
		);
		
		// Basic Authentication
		// 'authenticationEntryPoint' is essential to prevent the 
		// Spring Security authentication pop up whenever you input the wrong credentials in the
		// login page where a Http Request is sent!!
		http.httpBasic().authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint());
		
		// To disable CSRF
		http.csrf(csrf -> csrf.disable());
		
		return http.build();
	}
	
}
