package uk.co.scottlogic.gradProject.server.routers.dto;

public class CountPerMonthDTO {

  private int month;

  private int year;

  private long count;

  public CountPerMonthDTO(int month, int year, long count) {
    this.month = month;
    this.year = year;
    this.count = count;
  }

  public int getMonth() {
    return month;
  }

  public void setMonth(int month) {
    this.month = month;
  }

  public int getYear() {
    return year;
  }

  public void setYear(int year) {
    this.year = year;
  }

  public long getCount() {
    return count;
  }

  public void setCount(long count) {
    this.count = count;
  }

  public void increaseCount() {
    this.count += 1;
  }

}
