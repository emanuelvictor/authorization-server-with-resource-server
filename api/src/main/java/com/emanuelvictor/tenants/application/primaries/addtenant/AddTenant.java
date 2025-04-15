package com.emanuelvictor.tenants.application.primaries.addtenant;

import com.emanuelvictor.tenants.application.primaries.UserCase;
import jakarta.inject.Named;

@Named
public class AddTenant implements UserCase<AddTenantInput, AddTenantOutput> {

    @Override
    public AddTenantOutput execute(AddTenantInput o) {
        return null;
    }
}
