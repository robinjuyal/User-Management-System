package com.rj.UMS.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rj.UMS.backend.util.CommonUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice 
public class GlobalExceptionHandler {

     @ExceptionHandler(Exception.class)
    public ResponseEntity<?>handleException(Exception e){

        log.error("GlobalExceptionHandler :: handleException ::", e.getMessage());
       
        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?>handleNullPointerException(Exception e){
        log.error("GlobalExceptionHandler :: handleNullPointerException ::", e.getMessage());
        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?>handleResourceNotFoundException(Exception e){
        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.NOT_FOUND);

    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?>handleIllegalArgumentException(IllegalArgumentException e){

        return  CommonUtil.createErrorResponseMessage(e.getMessage(), HttpStatus.BAD_REQUEST);

    }

}
