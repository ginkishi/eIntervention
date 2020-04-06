import { TestBed } from "@angular/core/testing";

import { BrigadeApiService } from "./brigade-api.service";

describe("BrigadeApiService", () => {
  let service: BrigadeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrigadeApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
