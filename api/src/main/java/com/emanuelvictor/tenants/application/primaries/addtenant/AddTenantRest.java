package com.emanuelvictor.tenants.application.primaries.addtenant;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddTenantRest {

    private final AddTenant addTenant;

    public AddTenantRest(AddTenant addTenant) {
        this.addTenant = addTenant;
    }

    @PostMapping
    public AddTenantOutput addTenant(AddTenantInput addTenantInput) {
        return addTenant.execute(addTenantInput);
    }
}
