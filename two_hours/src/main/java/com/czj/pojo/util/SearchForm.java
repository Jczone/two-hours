package com.czj.pojo.util;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SearchForm {
    public int pageSize;
    public String title;
    public int currentPage;
    public int id;
}
